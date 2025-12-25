// Global Barrel exports

// Global Styles
export * as fonts from "./themes/Styles/fonts.css";
export * as GlobalTokens from "./themes/Styles/GlobalTokens.css";
export {Gradient, Glow} from "./themes/Styles/getCustomStyles.js";

// Utilities
export { geocodeAddress } from "./utils/geocodeAddress.js";
export {loadGoogleMapsScript} from "./utils/loadGoogleMapsScript.js";
export { DEFAULT_SERVICES } from "./utils/Constants";
export { getPageTitle } from "./utils/getPageTitle.js";

// Hooks
export {useAddressAutocomplete} from "./hooks/useAddressAutocomplete.js";
export {useNavigation} from "./hooks/useNavigation.js";

// API
export {NAV_ITEMS, ROUTES, 
    CUSTOMER_API_ENDPOINTS, 
    AUTH_ENDPOINTS,
    DEV_API_KEY,
    GOOGLE_MAPS_GEOCODE, 
    GOOGLE_MAPS_PLACES_AUTOCOMPLETE,
    GOOGLE_MAPS_LIB_ENDPT
} from "./api/endpoints/endpoints.js";