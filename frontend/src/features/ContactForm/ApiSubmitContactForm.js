import { http } from '../../api';

/**
 * Contact Form API
 * Handles form submission for contact form
 *
 * Created: 2025-12-27
 * Migrated from: api/service/form.api.js
 *
 * @see Backend: ContactPrivateApiController.java
 */

/**
 * Submit a form/contact request
 * @param {Object} ContactForm - Contact form data
 * @param {string} ContactForm.name - Customer name
 * @param {string} ContactForm.email - Customer email
 * @param {string} ContactForm.phone - Customer phone
 * @param {string} ContactForm.serviceType - Service type or custom message
 * @param {string} ContactForm.address - Service address
 * @param {number} ContactForm.lat - Latitude (optional)
 * @param {number} ContactForm.lng - Longitude (optional)
 * @param {string} ContactForm.notes - Additional notes (optional)
 * @returns {Promise} Axios response with form ID
 */
export const contactAPI = {
  submitform: (ContactForm) => http.post("/forms", ContactForm),

  // Deprecated: form submission endpoint removed from scope; retain stubbed submission until domain persistence wiring.
  // Future: Admin endpoints can be added here
  // Deprecated: form listing removed from scope; future form calculations live in separate service.
};
