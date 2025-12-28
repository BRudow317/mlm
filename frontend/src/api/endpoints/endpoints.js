
export const apiKey = "DevKey123";
export const DEV_API_KEY = "DevKey321";

// Backend auth API Endpoints
export const CUSTOMER_API_ENDPOINTS = {
  CUSTOMER: '/api/customer',
  ACCOUNT: '/api/customer/account',
  EMAIL: '/api/customer/email',
  PHONE: '/api/customer/phone',
  ADDRESS: '/api/customer/address',
};

// Backend auth API Endpoints
export const AUTH_ENDPOINTS = {
  LOGIN: '/api/auth/login',
  LOGOUT: '/api/auth/logout',
  REGISTER: '/api/auth/register',
  ME: '/api/auth/me',
};

// 3rd Party API Endpoints
export const GOOGLE_MAPS_GEOCODE 
    = 'https://maps.googleapis.com/maps/api/geocode/json';
export const GOOGLE_MAPS_PLACES_AUTOCOMPLETE 
    = 'https://maps.googleapis.com/maps/api/place/autocomplete/json'; 
export const GOOGLE_MAPS_LIB_ENDPT 
    = `https://maps.googleapis.com/maps/api/js?key=${apiKey || ""}&libraries=places`;