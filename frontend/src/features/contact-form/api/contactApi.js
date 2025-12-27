import { http } from '../../../api/axios/http';

/**
 * Contact Form API
 * Handles quote submission for contact form
 *
 * Created: 2025-12-27
 * Migrated from: api/service/quote.api.js
 *
 * @see Backend: ContactPrivateApiController.java
 */

/**
 * Submit a quote/contact request
 * @param {Object} quoteRequest - Contact form data
 * @param {string} quoteRequest.name - Customer name
 * @param {string} quoteRequest.email - Customer email
 * @param {string} quoteRequest.phone - Customer phone
 * @param {string} quoteRequest.serviceType - Service type or custom message
 * @param {string} quoteRequest.address - Service address
 * @param {number} quoteRequest.lat - Latitude (optional)
 * @param {number} quoteRequest.lng - Longitude (optional)
 * @param {string} quoteRequest.notes - Additional notes (optional)
 * @returns {Promise} Axios response with quote ID
 */
export const contactAPI = {
  submitQuote: (quoteRequest) => http.post("/quotes", quoteRequest),

  // Deprecated: quote submission endpoint removed from scope; retain stubbed submission until domain persistence wiring.
  // Future: Admin endpoints can be added here
  // Deprecated: quote listing removed from scope; future quote calculations live in separate service.
};
