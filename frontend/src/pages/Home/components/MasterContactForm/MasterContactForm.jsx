// MasterContactForm.jsx
import { useEffect, useRef, useState } from "react";
import { MapPin, Search, AlertTriangle, ChevronDown } from "lucide-react";
import { Default as styles } from "./MasterFormStyles.module.css";
import { DEFAULT_SERVICES } from "../../../../utils/Constants";
import { useAddressAutocomplete } from "./useAddressAutocomplete";
import { TextArea } from "../../../../components";

export function MasterContactForm({ serviceType, mergeTop = false }) {
  const shellRef = useRef(null);
  const customMessageRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: serviceType || "",
    customMessage: "",
    address: "",
    isEmergency: false,
  });

  const [showCustomMessage, setShowCustomMessage] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const serviceTypes = DEFAULT_SERVICES;

  const defaultCenter = { lat: 39.76833, lng: -86.1581 };

  const addressAutocomplete = useAddressAutocomplete({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    defaultCenter,
    maxSuggestions: 5,
    debounceMs: 400,
    onLocationSelected: (location) => {
      setFormData((prev) => ({ ...prev, address: location.address }));
    },
  });

  useEffect(() => {
    setShowCustomMessage(
      formData.serviceType === "" || formData.serviceType === "Describe"
    );
  }, [formData.serviceType]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    setErrors(newErrors);
    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setSubmitted(true);
      // eslint-disable-next-line no-console
      console.log("Form submitted:", formData);
    }
  };

  if (submitted) {
    return (
      <section aria-label="Form submitted">
        <div className={styles.mlmSuccessCard}>
          <div className={styles.mlmSuccessIcon} aria-hidden="true">
            ✓
          </div>
          <h2 className={styles.mlmSuccessTitle}>
            Form Submitted!
          </h2>
          <p className={styles.mlmSuccessMessage}>
            {formData.isEmergency
              ? "We'll contact you as soon as possible to assist."
              : "Thank you. We'll get back to you soon."}
          </p>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className={styles.mlmSuccessButton}
          >
            Submit Another Request
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="get-quote" ref={shellRef} aria-label="Service request form">
      <header className={styles.mlmMasterFormHeader}>
        <h4 className={styles.mlmMasterFormSubtitle}>
          Fill out the form to request a service quote
        </h4>
      </header>

      <form className={styles.mlmFormStack}>
        {/* Name */}
        <div className={styles.mlmField}>
          <label htmlFor="name" className={styles.mlmLabel}>
            Full Name <span className={styles.mlmRequired}>*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`${styles.mlmInput} ${
              errors.name ? styles.mlmInputError : ""
            }`}
            placeholder="Contact Name"
            autoComplete="name"
          />
          {errors.name && (
            <p className={styles.mlmErrorText}>{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div className={styles.mlmField}>
          <label htmlFor="email" className={styles.mlmLabel}>
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`${styles.mlmInput} ${
              errors.email ? styles.mlmInputError : ""
            }`}
            placeholder="Contact Email"
            autoComplete="email"
          />
          {errors.email && (
            <p className={styles.mlmErrorText}>{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div className={styles.mlmField}>
          <label htmlFor="phone" className={styles.mlmLabel}>
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className={`${styles.mlmInput} ${
              errors.phone ? styles.mlmInputError : ""
            }`}
            placeholder="Contact Phone"
            autoComplete="tel"
            inputMode="tel"
          />
          {errors.phone && (
            <p className={styles.mlmErrorText}>{errors.phone}</p>
          )}
        </div>

        {/* Service Type */}
        <div className={styles.mlmField}>
          <label htmlFor="serviceType" className={styles.mlmLabel}>
            Service Type
          </label>
          <TextArea
            id="customMessage"
            name="customMessage"
            value={formData.customMessage}
            onChange={handleInputChange}
            rows={4}
            className={`${styles.mlmTextarea} `}
            placeholder="Please describe how we can help..."
          />
        </div>

        {/* Address */}
        <div className={styles.mlmField}>
          <label htmlFor="address" className={styles.mlmLabel}>
            Service Address{" "}
            <span className={styles.mlmRequired}>*</span>
          </label>

          <div className={styles.mlmAddressWrap}>
            <Search
              size={18}
              className={styles.mlmSearchIcon}
              aria-hidden="true"
            />
            <input
              type="text"
              id="address"
              placeholder="Contact Address..."
              value={addressAutocomplete.address}
              onChange={addressAutocomplete.handleAddressChange}
              onFocus={addressAutocomplete.handleInputFocus}
              onBlur={addressAutocomplete.handleInputBlur}
              onKeyDown={addressAutocomplete.handleKeyDown}
              className={`${styles.mlmInput} ${
                styles.mlmInputWithIcon
              } ${errors.address ? styles.mlmInputError : ""}`}
              aria-autocomplete="list"
              aria-controls={addressAutocomplete.listboxId}
              aria-expanded={addressAutocomplete.suggestions.length > 0}
            />

            {(addressAutocomplete.suggestions.length > 0 ||
              addressAutocomplete.isLoading) && (
              <div className={styles.mlmSuggestionsPanel}>
                {addressAutocomplete.isLoading && (
                  <div className={styles.mlmSuggestionsLoading}>
                    Searching...
                  </div>
                )}

                {addressAutocomplete.suggestions.length > 0 && (
                  <div id={addressAutocomplete.listboxId} role="listbox">
                    {addressAutocomplete.suggestions.map(
                      (suggestion, index) => (
                        <div
                          key={`${suggestion.placeId}-${index}`}
                          role="option"
                          aria-selected={
                            index === addressAutocomplete.activeIndex
                          }
                          className={`${styles.mlmSuggestionRow} ${
                            index === addressAutocomplete.activeIndex
                              ? styles.mlmSuggestionRowActive
                              : ""
                          }`}
                          onMouseDown={(e) => {
                            e.preventDefault();
                            addressAutocomplete.handleSelectSuggestion(
                              suggestion
                            );
                          }}
                        >
                          <MapPin
                            size={18}
                            className={styles.mlmPinIcon}
                            aria-hidden="true"
                          />
                          <span className={styles.mlmSuggestionText}>
                            {suggestion.address}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {errors.address && (
            <p className={styles.mlmErrorText}>{errors.address}</p>
          )}
          {/* Emergency + Submit */}
          <div className={styles.mlmFooterRow}>
            <label className={styles.mlmToggleLabel}>
              <span className={styles.mlmToggleWrap}>
                <input
                  type="checkbox"
                  name="isEmergency"
                  checked={formData.isEmergency}
                  onChange={handleInputChange}
                  className={styles.mlmToggleInput}
                />
                <span
                  className={styles.mlmToggleTrack}
                  aria-hidden="true"
                />
                <span
                  className={styles.mlmToggleThumb}
                  aria-hidden="true"
                />
              </span>

              <span className={styles.mlmEmergencyTextWrap}>
                {formData.isEmergency && (
                  <AlertTriangle
                    size={18}
                    className={styles.mlmEmergencyIcon}
                    aria-hidden="true"
                  />
                )}
                <span
                  className={`${styles.mlmEmergencyText} ${
                    formData.isEmergency
                      ? styles.mlmEmergencyTextOn
                      : ""
                  }`}
                >
                  Is this an Urgent Request?
                </span>
              </span>
            </label>

            <button
              type="button"
              onClick={handleSubmit}
              className={[
                styles.mlmSubmitButton,
                formData.isEmergency
                  ? styles.mlmSubmitEmergency
                  : "mlmItem", // use your global override here
              ].join(" ")}
            >
              {formData.isEmergency
                ? "Submit Urgent Request"
                : "Submit Request"}
            </button>
          </div>
        </div>
      </form>
      {/* Google Maps Embed */}
      <div className={styles.mlmMapShell}>
        <div
          ref={addressAutocomplete.mapRef}
          className={styles.mlmMap}
        />
      </div>
    </section>
  );
}
