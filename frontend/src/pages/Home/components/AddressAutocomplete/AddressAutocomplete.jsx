import React, { useMemo } from "react";
import { MapPin, Search } from "lucide-react";
import { AddressAutocompleteStyles } from "./AddressAutocomplete.css";
import { useAddressAutocomplete } from "./useAddressAutocomplete.hook.js";
//import GlobalTokens from "../../../../";

/**
 * AddressAutocomplete (View)
 * - Pure rendering + wiring to handlers
 * - All state/effects live in the custom hook
 */
export const AddressAutocomplete = ({
  title = "Address Lookup",
  instructions = "Start typing an address to see suggestions",
  googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  defaultCenter = { lat: 39.76833, lng: -86.1581 }, // Indianapolis
  maxSuggestions = 3,
  onLocationSelected, // optional: (location) => void
}) => {

  const {
    address,
    suggestions,
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
  } = useAddressAutocomplete({
    googleMapsApiKey,
    defaultCenter,
    maxSuggestions,
    onLocationSelected,
  });

  const styles = useMemo(
    () => AddressAutocompleteStyles({ isFocused }),
    [ isFocused]
  );

  const showSuggestions = suggestions.length > 0;
  const showLoading = isLoading;

  return (
    <section style={styles.container} aria-label="Address autocomplete">
      <h1 style={styles.title}>{title}</h1>
      <p style={styles.instructions}>{instructions}</p>

      <div style={styles.inputWrapper}>
        <div style={styles.inputContainer}>
          <Search size={18} style={styles.searchIcon} aria-hidden="true" />
          <input
            type="text"
            placeholder="Enter an address..."
            value={address}
            onChange={handleAddressChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onKeyDown={handleKeyDown}
            style={styles.input}
            aria-autocomplete="list"
            aria-controls={listboxId}
            aria-expanded={showSuggestions || showLoading}
            aria-activedescendant={
              activeIndex >= 0 ? `${listboxId}-option-${activeIndex}` : undefined
            }
          />
        </div>

        {(showSuggestions || showLoading) && (
          <div style={styles.suggestionsContainer}>
            {showLoading && (
              <div style={styles.loadingText} role="status" aria-live="polite">
                Searching...
              </div>
            )}

            {showSuggestions && (
              <div id={listboxId} role="listbox" aria-label="Address suggestions">
                {suggestions.map((suggestion, index) => {
                  const isActive = index === activeIndex;

                  return (
                    <div
                      key={`${suggestion.placeId || suggestion.address}-${index}`}
                      id={`${listboxId}-option-${index}`}
                      role="option"
                      aria-selected={isActive}
                      style={styles.getSuggestionStyle({ isActive })}
                      onMouseDown={(e) => {
                        // Prevent blur before click registers
                        e.preventDefault();
                        handleSelectSuggestion(suggestion);
                      }}
                    >
                      <MapPin size={18} style={styles.suggestionIcon} aria-hidden="true" />
                      <span style={styles.suggestionText}>{suggestion.address}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      <div style={styles.mapContainer}>
        <div ref={mapRef} style={styles.map} />
      </div>
    </section>
  );
};
