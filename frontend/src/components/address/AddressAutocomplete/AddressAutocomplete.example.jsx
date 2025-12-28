import React, { useState } from "react";
import { AddressAutocomplete } from "./AddressAutocomplete";

/**
 * Demo:
 * - Shows how to capture the selected location (lat/lng/address)
 * - Useful for wiring into your "Get a Quote" form payload
 */
export function AddressAutocompleteExample() {
  const [location, setLocation] = useState(null);

  return (
    <div>
      <AddressAutocomplete
        onLocationSelected={(loc) => setLocation(loc)}
        // Optionally override api key/center:
        // googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
        // defaultCenter={{ lat: 39.76833, lng: -86.1581 }}
      />

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 2rem 2rem" }}>
        <h3 style={{ margin: "0 0 0.5rem 0" }}>Selected Location (for your form)</h3>
        <pre
          style={{
            margin: 0,
            padding: "12px",
            borderRadius: "10px",
            border: "1px solid rgba(0,0,0,0.12)",
            backgroundColor: "rgba(0,0,0,0.03)",
            overflowX: "auto",
          }}
        >
          {JSON.stringify(location, null, 2)}
        </pre>
      </div>
    </div>
  );
}
