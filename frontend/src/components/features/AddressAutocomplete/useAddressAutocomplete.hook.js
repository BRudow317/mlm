import { useEffect, useMemo, useRef, useState, useCallback } from "react";

/**
 * SECURITY NOTE (important):
 * - Putting a Google Maps API key in the frontend is standard for Maps JS, but you MUST restrict it
 *   in Google Cloud Console (HTTP referrers + only the APIs you need) to reduce abuse risk.
 */

/**
 * Loads the Google Maps JS script once per page (idempotent).
 * Returns a promise that resolves when window.google.maps is ready.
 */
function loadGoogleMapsScript({ apiKey }) {
  const SCRIPT_ID = "google-maps-js";

  return new Promise((resolve, reject) => {
    // Already loaded
    if (window.google?.maps) {
      resolve(true);
      return;
    }

    // If script tag exists, attach listeners
    const existing = document.getElementById(SCRIPT_ID);
    if (existing) {
      existing.addEventListener("load", () => resolve(true));
      existing.addEventListener("error", reject);
      return;
    }

    // Create script tag
    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.async = true;
    script.defer = true;

    // NOTE: places library is included in case you later switch to Places Autocomplete.
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey || ""}&libraries=places`;

    script.onload = () => resolve(true);
    script.onerror = reject;

    document.head.appendChild(script);
  });
}

/**
 * Geocode with Google Maps Geocoder and return an array of suggestions.
 */
function geocodeAddress({ searchAddress, maxSuggestions }) {
  if (!window.google?.maps) return Promise.resolve([]);

  const geocoder = new window.google.maps.Geocoder();

  return new Promise((resolve, reject) => {
    geocoder.geocode({ address: searchAddress }, (results, status) => {
      if (status === "OK" && results) {
        const sliced = results.slice(0, maxSuggestions).map((result) => ({
          address: result.formatted_address,
          lat: result.geometry.location.lat(),
          lng: result.geometry.location.lng(),
          placeId: result.place_id,
        }));
        resolve(sliced);
      } else {
        reject(status);
      }
    });
  });
}

/**
 * useAddressAutocomplete
 * - Owns: address input state, suggestions, loading
 * - Owns: Google script loading, map init, marker updates
 * - Provides: event handlers + refs for the view
 */
export function useAddressAutocomplete({
  googleMapsApiKey,
  defaultCenter,
  maxSuggestions = 3,
  onLocationSelected,
  debounceMs = 250,
}) {
  const mapRef = useRef(null);
  const googleMapRef = useRef(null);
  const markerRef = useRef(null);

  const debounceRef = useRef(null);

  const [address, setAddress] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Keyboard navigation inside suggestions
  const [activeIndex, setActiveIndex] = useState(-1);

  const listboxId = useMemo(
    () => `address-suggestions-${Math.random().toString(16).slice(2)}`,
    []
  );

  const initMap = useCallback(() => {
    if (!mapRef.current || !window.google?.maps) return;

    googleMapRef.current = new window.google.maps.Map(mapRef.current, {
      center: defaultCenter,
      zoom: 12,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
    });

    markerRef.current = new window.google.maps.Marker({
      map: googleMapRef.current,
      position: defaultCenter,
    });
  }, [defaultCenter]);

  // Load Google Maps JS on mount and initialize map
  useEffect(() => {
    let isMounted = true;

    if (!googleMapsApiKey) {
      // Component still works (mock suggestions), but map/geocoding may not load.
      console.warn("Google Maps API key is missing; map features may not load.");
    }

    loadGoogleMapsScript({ apiKey: googleMapsApiKey })
      .then(() => {
        if (!isMounted) return;
        initMap();
      })
      .catch((err) => {
        console.error("Failed to load Google Maps script:", err);
      });

    return () => {
      isMounted = false;
    };
  }, [googleMapsApiKey, initMap]);

  // Update map when selected location changes
  useEffect(() => {
    if (!selectedLocation || !googleMapRef.current || !markerRef.current) return;

    const position = { lat: selectedLocation.lat, lng: selectedLocation.lng };
    googleMapRef.current.setCenter(position);
    googleMapRef.current.setZoom(15);
    markerRef.current.setPosition(position);
  }, [selectedLocation]);

  const clearSuggestions = useCallback(() => {
    setSuggestions([]);
    setActiveIndex(-1);
  }, []);

  const handleAddressChange = useCallback(
    (e) => {
      const value = e.target.value;
      setAddress(value);

      // Reset selection state when typing
      setSelectedLocation(null);

      // Too short: clear immediately
      if (value.trim().length < 3) {
        setIsLoading(false);
        clearSuggestions();
        return;
      }

      // Debounce geocoding to reduce requests
      if (debounceRef.current) clearTimeout(debounceRef.current);

      debounceRef.current = setTimeout(async () => {
        setIsLoading(true);

        try {
          if (window.google?.maps) {
            const results = await geocodeAddress({
              searchAddress: value,
              maxSuggestions,
            });
            setSuggestions(results);
            setActiveIndex(results.length > 0 ? 0 : -1);
          } else {
            // Fallback mock if Google Maps not loaded
            const mock = [
              {
                address: `${value}, Indianapolis, IN, USA`,
                lat: defaultCenter.lat,
                lng: defaultCenter.lng,
                placeId: "mock",
              },
            ];
            setSuggestions(mock);
            setActiveIndex(0);
          }
        } catch (error) {
          console.error("Geocoding error:", error);
          clearSuggestions();
        } finally {
          setIsLoading(false);
        }
      }, debounceMs);
    },
    [clearSuggestions, debounceMs, defaultCenter.lat, defaultCenter.lng, maxSuggestions]
  );

  const handleSelectSuggestion = useCallback(
    (suggestion) => {
      setAddress(suggestion.address);
      const loc = { lat: suggestion.lat, lng: suggestion.lng, address: suggestion.address };
      setSelectedLocation(loc);

      clearSuggestions();
      setIsLoading(false);

      if (typeof onLocationSelected === "function") {
        onLocationSelected(loc);
      }
    },
    [clearSuggestions, onLocationSelected]
  );

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    // Delay blur so a suggestion click (onMouseDown) can register cleanly.
    setTimeout(() => {
      setIsFocused(false);
      setIsLoading(false);
      clearSuggestions();
    }, 120);
  }, [clearSuggestions]);

  const handleKeyDown = useCallback(
    (e) => {
      if (suggestions.length === 0) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((idx) => Math.min(idx + 1, suggestions.length - 1));
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((idx) => Math.max(idx - 1, 0));
      }

      if (e.key === "Enter") {
        e.preventDefault();
        if (activeIndex >= 0 && activeIndex < suggestions.length) {
          handleSelectSuggestion(suggestions[activeIndex]);
        }
      }

      if (e.key === "Escape") {
        e.preventDefault();
        clearSuggestions();
      }
    },
    [activeIndex, clearSuggestions, handleSelectSuggestion, suggestions]
  );

  return {
    // state
    address,
    suggestions,
    selectedLocation,
    isLoading,
    isFocused,
    activeIndex,

    // refs
    mapRef,

    // a11y
    listboxId,

    // handlers
    handleAddressChange,
    handleSelectSuggestion,
    handleInputFocus,
    handleInputBlur,
    handleKeyDown,
  };
}
