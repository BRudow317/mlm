import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { loadGoogleMapsScript, geocodeAddress } from "../";
/**
 * useAddressAutocomplete hook
 */
export function useAddressAutocomplete({
  googleMapsApiKey = "",
  defaultCenter = { lat: 37.7749, lng: -122.4194 },
  maxSuggestions = 3,
  onLocationSelected,
  debounceMs = 1500,
}) {
  const mapRef = useRef(null);
  const googleMapRef = useRef(null);
  const markerRef = useRef(null);
  const debounceRef = useRef(null);
  const mapInitializedRef = useRef(false);

  const [address, setAddress] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const listboxId = useMemo(
    () => `address-suggestions-${Math.random().toString(16).slice(2)}`,
    []
  );

  const initMap = useCallback(() => {
    console.log('initMap called:', {
      hasMapRef: !!mapRef.current,
      hasGoogleMaps: !!window.google?.maps,
      alreadyInitialized: mapInitializedRef.current
    });
    
    if (mapInitializedRef.current) {
      console.log('Map already initialized, skipping...');
      return;
    }
    
    if (!mapRef.current || !window.google?.maps) {
      console.log('Cannot initialize map - missing refs or Google Maps API');
      return;
    }

    console.log('Creating Google Map instance...');
    googleMapRef.current = new window.google.maps.Map(mapRef.current, {
      center: defaultCenter,
      zoom: 12,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
    });

    console.log('Creating marker...');
    markerRef.current = new window.google.maps.Marker({
      map: googleMapRef.current,
      position: defaultCenter,
    });
    
    mapInitializedRef.current = true;
    console.log('Map initialized successfully');
  }, [defaultCenter]);

  useEffect(() => {
  let isMounted = true;

  const mapsEnabled = import.meta.env.VITE_MAPS_ENABLED === "true";

  loadGoogleMapsScript({ apiKey: googleMapsApiKey, enabled: mapsEnabled })
    .then((loaded) => {
      if (!isMounted) return;

      // loaded === false means: intentionally skipped (dev/no key/placeholder)
      if (!loaded) return;

      initMap();
    })
    .catch((err) => {
      // Only log if we actually attempted to load maps
      console.error("Failed to load Google Maps script:", err);
    });

  return () => {
    isMounted = false;
  };
}, [googleMapsApiKey, initMap]);


  useEffect(() => {
    if (!selectedLocation || !googleMapRef.current || !markerRef.current) {
      console.log('Map update skipped:', {
        hasSelectedLocation: !!selectedLocation,
        hasGoogleMapRef: !!googleMapRef.current,
        hasMarkerRef: !!markerRef.current,
        selectedLocation
      });
      return;
    }

    console.log('Updating map to:', selectedLocation);
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

      if (value.trim().length < 3) {
        setIsLoading(false);
        clearSuggestions();
        return;
      }

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
          }
        } catch (error) {
          console.error("Geocoding error:", error);
          clearSuggestions();
        } finally {
          setIsLoading(false);
        }
      }, debounceMs);
    },
    [clearSuggestions, debounceMs, maxSuggestions]
  );

  const handleSelectSuggestion = useCallback(
    (suggestion) => {
      console.log('Suggestion selected:', suggestion);
      setAddress(suggestion.address);
      const loc = { lat: suggestion.lat, lng: suggestion.lng, address: suggestion.address };
      console.log('Setting location to:', loc);
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
    setTimeout(() => {
      setIsFocused(false);
      setIsLoading(false);
      clearSuggestions();
    }, 200);
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
    address,
    suggestions,
    selectedLocation,
    isLoading,
    isFocused,
    activeIndex,
    mapRef,
    listboxId,
    handleAddressChange,
    handleSelectSuggestion,
    handleInputFocus,
    handleInputBlur,
    handleKeyDown,
  };
};