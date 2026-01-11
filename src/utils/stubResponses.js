/* global module */
/**
 * Stub Response Utility (src/utils/stubResponses.js)
 *
 * Purpose:
 * - Central place to define deterministic stubbed responses for local development.
 * - Used by the JSON Server middleware (middleware.js) to short-circuit API requests.
 *
 * Coverage:
 * - CustomerService endpoints (CUSTOMER_API_ENDPOINTS)
 * - AuthService endpoints (AUTH_ENDPOINTS)
 * - Note: Third-party endpoints (Google Maps) are external and not stubbed here.
 *
 * Usage:
 * - Import `getStubResponse(method, path)` in middleware and return the stub when present.
 *
 * Notes:
 * - All paths are matched literally as defined in src/api/endpoints/endpoints.js.
 * - Extend the `STUBS` map with new endpoints or methods as needed.
 */

/**
 * STUBS: Map of endpoint path -> HTTP method -> stub definition
 * Each stub definition can include:
 * - status: HTTP status code
 * - data: JSON payload to return
 * - headers: optional headers to attach
 */
const STUBS = {
  "/api/customer": {
    GET: {
      status: 200,
      data: {
        id: "cust_123",
        firstName: "Ada",
        lastName: "Lovelace",
        email: "ada@example.com",
        phone: "+1-555-0100",
        addresses: [
          {
            id: "addr_1",
            label: "Home",
            line1: "123 Analytical Engine Rd",
            city: "London",
            state: "LDN",
            postalCode: "E1 6AN",
            country: "UK",
          },
        ],
        createdAt: "2025-01-01T12:00:00Z",
        updatedAt: "2025-01-01T12:00:00Z",
      },
    },
    POST: {
      status: 201,
      data: {
        id: "cust_124",
        firstName: "New",
        lastName: "Customer",
        email: "new.customer@example.com",
        phone: "+1-555-0199",
        addresses: [],
        createdAt: "2025-12-23T00:00:00Z",
        updatedAt: "2025-12-23T00:00:00Z",
      },
    },
    PUT: {
      status: 200,
      data: {
        id: "cust_123",
        updated: true,
        fields: ["firstName", "lastName", "email", "phone"],
      },
    },
    DELETE: {
      status: 204,
      data: null,
    },
  },

  /**
   * Service: CustomerService (Account)
   * Endpoint: /api/customer/account
   * - GET: Returns basic account stats for the current customer
   * - PATCH: Simulates a partial update of account preferences
   */
  "/api/customer/account": {
    GET: {
      status: 200,
      data: {
        customerId: "cust_123",
        plan: "pro",
        status: "active",
        renewalDate: "2026-01-01",
        preferences: {
          marketingEmails: true,
          smsAlerts: false,
        },
      },
    },
    PATCH: {
      status: 200,
      data: {
        customerId: "cust_123",
        preferencesUpdated: true,
      },
    },
  },

  /**
   * Service: CustomerService (Email)
   * Endpoint: /api/customer/email
   * - POST: Initiates email update or verification flow
   */
  "/api/customer/email": {
    POST: {
      status: 202,
      data: {
        customerId: "cust_123",
        verificationSent: true,
        to: "ada.new@example.com",
      },
    },
  },

  /**
   * Service: CustomerService (Phone)
   * Endpoint: /api/customer/phone
   * - POST: Initiates phone update or verification flow
   */
  "/api/customer/phone": {
    POST: {
      status: 202,
      data: {
        customerId: "cust_123",
        verificationSent: true,
        to: "+1-555-0101",
      },
    },
  },

  /**
   * Service: CustomerService (Address)
   * Endpoint: /api/customer/address
   * - GET: Returns list of saved addresses
   * - POST: Creates a new address
   * - DELETE: Deletes an address by id (simulated)
   */
  "/api/customer/address": {
    GET: {
      status: 200,
      data: [
        {
          id: "addr_1",
          label: "Home",
          line1: "123 Analytical Engine Rd",
          city: "London",
          state: "LDN",
          postalCode: "E1 6AN",
          country: "UK",
        },
        {
          id: "addr_2",
          label: "Office",
          line1: "42 Babbage St",
          city: "London",
          state: "LDN",
          postalCode: "E2 7AA",
          country: "UK",
        },
      ],
    },
    POST: {
      status: 201,
      data: {
        id: "addr_3",
        label: "Vacation",
        line1: "1 Infinite Loop",
        city: "Cupertino",
        state: "CA",
        postalCode: "95014",
        country: "USA",
      },
    },
    DELETE: {
      status: 204,
      data: null,
    },
  },

  /**
   * Service: AuthService
   * Endpoints: /api/auth/login, /api/auth/logout, /api/auth/register, /api/auth/me
   */
  "/api/auth/login": {
    POST: {
      status: 200,
      data: {
        token: "jwt.mock.token.abc123",
        user: {
          id: "cust_123",
          firstName: "Ada",
          lastName: "Lovelace",
          email: "ada@example.com",
          roles: ["user"],
        },
      },
    },
  },
  "/api/auth/logout": {
    POST: {
      status: 200,
      data: { success: true },
    },
  },
  "/api/auth/register": {
    POST: {
      status: 201,
      data: {
        id: "cust_125",
        email: "register.me@example.com",
        onboardingComplete: false,
      },
    },
  },
  "/api/auth/me": {
    GET: {
      status: 200,
      data: {
        id: "cust_123",
        firstName: "Ada",
        lastName: "Lovelace",
        email: "ada@example.com",
        roles: ["user"],
      },
    },
  },

  /**
   * Service: ThirdPartyService (Google Maps Geocoding API)
   * Endpoint (proxied/local path): /maps/api/geocode/json
   * Original endpoint (absolute): https://maps.googleapis.com/maps/api/geocode/json
   * Method:
   * - GET: Returns a minimal Geocoding response structure
   *
   * Notes:
   * - To use this stub, route requests through your dev server (e.g., proxy
   *   or replace the base URL during development) so that the request path is
   *   `/maps/api/geocode/json` and hits json-server middleware.
   */
  "/maps/api/geocode/json": {
    GET: {
      status: 200,
      data: {
        results: [
          {
            formatted_address: "1600 Amphitheatre Parkway, Mountain View, CA 94043, USA",
            geometry: {
              location: { lat: 37.4220656, lng: -122.0840897 },
              location_type: "ROOFTOP",
            },
            place_id: "ChIJ2eUgeAK6j4ARbn5u_wAGqWA",
            types: ["street_address"],
          },
        ],
        status: "OK",
      },
      headers: {
        "Cache-Control": "no-store",
      },
    },
  },

  /**
   * Service: ThirdPartyService (Google Places Autocomplete API)
   * Endpoint (proxied/local path): /maps/api/place/autocomplete/json
   * Original endpoint (absolute): https://maps.googleapis.com/maps/api/place/autocomplete/json
   * Method:
   * - GET: Returns a minimal Autocomplete response structure
   *
   * Notes:
   * - To use this stub, route requests through your dev server so the request
   *   path becomes `/maps/api/place/autocomplete/json`.
   */
  "/maps/api/place/autocomplete/json": {
    GET: {
      status: 200,
      data: {
        predictions: [
          {
            description: "1600 Amphitheatre Pkwy, Mountain View, CA, USA",
            place_id: "ChIJ2eUgeAK6j4ARbn5u_wAGqWA",
            structured_formatting: {
              main_text: "1600 Amphitheatre Pkwy",
              secondary_text: "Mountain View, CA, USA",
            },
            types: ["street_address"],
          },
          {
            description: "1 Infinite Loop, Cupertino, CA, USA",
            place_id: "ChIJj61dQgK6j4AR4GeTYWZsKWs",
            structured_formatting: {
              main_text: "1 Infinite Loop",
              secondary_text: "Cupertino, CA, USA",
            },
            types: ["street_address"],
          },
        ],
        status: "OK",
      },
      headers: {
        "Cache-Control": "no-store",
      },
    },
  },
};

/**
 * getStubResponse
 * Finds a stub by HTTP method and request path.
 *
 * @param {string} method - HTTP method (GET, POST, etc.)
 * @param {string} path - Request path (e.g., "/api/customer")
 * @returns {{status:number, data:any, headers?:Object}|undefined}
 */
function getStubResponse(method, path) {
  if (!method || !path) return undefined;
  const normalizedMethod = String(method).toUpperCase();
  const entry = STUBS[path];
  if (!entry) return undefined;
  return entry[normalizedMethod];
}

module.exports = {
  STUBS,
  getStubResponse,
};
