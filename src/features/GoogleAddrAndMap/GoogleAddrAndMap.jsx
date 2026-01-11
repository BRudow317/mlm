
/**
 * useGoogleLocationPicker.jsx
 * @description
 * Combines GoogleAddressInput and GoogleMapBox into a coordinated pair.
 * Returns a tuple: [AddressInputComponent, MapComponent, { location, setLocation }]
 * 
 * @param
 * 
 * @example
 *   const [AddressInput, Map, { location }] = useGoogleLocationPicker();
 *   return (
 *     <div>
 *       <AddressInput />
 *       <Map />
 *     </div>
 *   );
 */
import { useMemo, useState, useCallback, memo } from "react";
import { GoogleAddressInput } from "../../components/GoogleAddressInput/GoogleAddressInput";
import { GoogleMapBox } from "../../components/GoogleMapBox/GoogleMapBox";
export { GoogleAddrAndMap };

const DEFAULT_CENTER = { lat: 39.7684, lng: -86.1581 };
const DEFAULT_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";
// TODO: Wire up the proper map ID from google cloud console
const DEFAULT_MAP_ID = import.meta.env.VITE_GOOGLE_MAP_ID || "DEMO_MAP_ID";

function GoogleAddrAndMap({
  apiKey = DEFAULT_API_KEY,
  mapId = DEFAULT_MAP_ID,
  defaultCenter = DEFAULT_CENTER,
  onLocationSelected,
} = {}) {
  const [location, setLocation] = useState(null);

  const handleLocationSelected = useCallback(
    (loc) => {
      setLocation(loc);
      if (onLocationSelected) {
        onLocationSelected(loc);
      }
    },
    [onLocationSelected]
  );

  const center = useMemo(() => {
    return location?.lat && location?.lng
      ? { lat: location.lat, lng: location.lng }
      : defaultCenter;
  }, [location, defaultCenter]);

  // Return memoized component functions instead of JSX elements
  const AddressInputComponent = useMemo(() => {
    const Component = memo(({ style, className, ...props }) => (
      <GoogleAddressInput
        apiKey={apiKey}
        onLocationSelected={handleLocationSelected}
        style={style}
        className={className}
        {...props}
      />
    ));
    Component.displayName = 'GoogleAddressInputWrapper';
    return Component;
  }, [apiKey, handleLocationSelected]);

  const MapBoxComponent = useMemo(() => {
    const Component = memo(({ style, className }) => (
      <GoogleMapBox
        apiKey={apiKey}
        mapId={mapId}
        center={center}
        zoom={15}
        style={style}
        className={className}
      />
    ));
    Component.displayName = 'GoogleMapBoxWrapper';
    return Component;
  }, [apiKey, mapId, center]);

  return [AddressInputComponent, MapBoxComponent, { location, setLocation }];
}


