/**
 * Geocode with Google Maps Geocoder
 */
export function geocodeAddress({ 
    searchAddress, 
    maxSuggestions = 3
}) {
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
};