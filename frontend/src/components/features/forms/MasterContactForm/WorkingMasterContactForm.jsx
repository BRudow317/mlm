// MasterContactForm.jsx
import React, { useEffect, useState } from "react";
import { MapPin, Search, AlertTriangle, ChevronDown } from "lucide-react";
import MasterFormStyles from "./MasterFormStyles.module.css";
import { DEFAULT_SERVICES } from "../../../..";
import { useAddressAutocomplete, DEV_API_KEY } from "../../../..";

/**
 * Main Form Component
 * - Uses CSS Module (MasterFormStyles.module.css)
 * - No global class strings
 */
export function MasterContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    customMessage: "",
    address: "",
    isEmergency: false,
  });

  const [showCustomMessage, setShowCustomMessage] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const serviceTypes = DEFAULT_SERVICES ?? [
    "Plumbing",
    "Electrical",
    "HVAC",
    "Roofing",
    "General Repair",
    "Not sure",
  ];

  const defaultCenter = { lat: 39.76833, lng: -86.1581 };

  const addressAutocomplete = useAddressAutocomplete({
    googleMapsApiKey: DEV_API_KEY,
    defaultCenter,
    maxSuggestions: 5,
    onLocationSelected: (location) => {
      setFormData((prev) => ({ ...prev, address: location.address }));
    },
  });

  useEffect(() => {
  setShowCustomMessage(
    formData.serviceType === "" || formData.serviceType === "NOT_SURE"
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

    if (!formData.name.trim()) newErrors.name = "Name is required";

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Phone must be 10 digits";
    }

    if (!showCustomMessage && !formData.serviceType) {
      newErrors.serviceType = "Please select a service type";
    }

    if (showCustomMessage && !formData.customMessage.trim()) {
      newErrors.customMessage = "Please provide details about your needs";
    }

    if (!addressAutocomplete.address.trim()) {
      newErrors.address = "Address is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
      <section
        className={MasterFormStyles.mlmMasterFormShell}
        aria-label="Form submitted"
      >
        <div className={MasterFormStyles.mlmSuccessCard}>
          <div className={MasterFormStyles.mlmSuccessIcon} aria-hidden="true">
            ✓
          </div>
          <h2 className={MasterFormStyles.mlmSuccessTitle}>
            Form Submitted Successfully!
          </h2>
          <p className={MasterFormStyles.mlmSuccessMessage}>
            {formData.isEmergency
              ? "We'll contact you immediately for this emergency."
              : "Thank you for your submission. We'll get back to you soon."}
          </p>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className={MasterFormStyles.mlmSuccessButton}
          >
            Submit Another Request
          </button>
        </div>
      </section>
    );
  }

  return (
    <section
      className={MasterFormStyles.mlmMasterFormShell}
      aria-label="Service request form"
    >
      <header className={MasterFormStyles.mlmMasterFormHeader}>
        <h1 className={MasterFormStyles.mlmMasterFormTitle}>
          Service Request Form
        </h1>
        <p className={MasterFormStyles.mlmMasterFormSubtitle}>
          Fill out the form below to request service
        </p>
      </header>

      <div className={MasterFormStyles.mlmFormStack}>
        {/* Name */}
        <div className={MasterFormStyles.mlmField}>
          <label htmlFor="name" className={MasterFormStyles.mlmLabel}>
            Full Name <span className={MasterFormStyles.mlmRequired}>*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`${MasterFormStyles.mlmInput} ${
              errors.name ? MasterFormStyles.mlmInputError : ""
            }`}
            placeholder="John Doe"
            autoComplete="name"
          />
          {errors.name && (
            <p className={MasterFormStyles.mlmErrorText}>{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div className={MasterFormStyles.mlmField}>
          <label htmlFor="email" className={MasterFormStyles.mlmLabel}>
            Email Address <span className={MasterFormStyles.mlmRequired}>*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`${MasterFormStyles.mlmInput} ${
              errors.email ? MasterFormStyles.mlmInputError : ""
            }`}
            placeholder="john@example.com"
            autoComplete="email"
          />
          {errors.email && (
            <p className={MasterFormStyles.mlmErrorText}>{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div className={MasterFormStyles.mlmField}>
          <label htmlFor="phone" className={MasterFormStyles.mlmLabel}>
            Phone Number <span className={MasterFormStyles.mlmRequired}>*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className={`${MasterFormStyles.mlmInput} ${
              errors.phone ? MasterFormStyles.mlmInputError : ""
            }`}
            placeholder="(555) 123-4567"
            autoComplete="tel"
            inputMode="tel"
          />
          {errors.phone && (
            <p className={MasterFormStyles.mlmErrorText}>{errors.phone}</p>
          )}
        </div>

        {/* Service Type */}
        <div className={MasterFormStyles.mlmField}>
          <div className={MasterFormStyles.mlmFieldRow}>
            <label htmlFor="serviceType" className={MasterFormStyles.mlmLabel}>
              Service Type <span className={MasterFormStyles.mlmRequired}>*</span>
            </label>
            <button
              type="button"
              onClick={() => {
                const next = !showCustomMessage;
                setShowCustomMessage(next);
                setFormData((prev) => ({
                  ...prev,
                  serviceType: "",
                  customMessage: "",
                }));
              }}
              className={MasterFormStyles.mlmLinkButton}
            >
              {showCustomMessage ? "Show dropdown" : "Custom message"}
            </button>
          </div>

          {!showCustomMessage ? (
            <div className={MasterFormStyles.mlmSelectWrap}>
              <select
  id="serviceType"
  name="serviceType"
  value={formData.serviceType}
  onChange={handleInputChange}
  className={`${MasterFormStyles.mlmSelect} ${
    errors.serviceType ? MasterFormStyles.mlmInputError : ""
  }`}
>
  <option value="">Select a service...</option>

  {serviceTypes.map((svc) => (
    <option key={svc.id} value={svc.id}>
      {svc.title}
    </option>
  ))}

  <option value="NOT_SURE">Not sure</option>
</select>

              <ChevronDown
                className={MasterFormStyles.mlmSelectIcon}
                size={20}
                aria-hidden="true"
              />

              {errors.serviceType && (
                <p className={MasterFormStyles.mlmErrorText}>
                  {errors.serviceType}
                </p>
              )}
            </div>
          ) : (
            <div>
              <textarea
                id="customMessage"
                name="customMessage"
                value={formData.customMessage}
                onChange={handleInputChange}
                rows={4}
                className={`${MasterFormStyles.mlmTextarea} ${
                  errors.customMessage ? MasterFormStyles.mlmInputError : ""
                }`}
                placeholder="Please describe what you need help with..."
              />
              {errors.customMessage && (
                <p className={MasterFormStyles.mlmErrorText}>
                  {errors.customMessage}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Address */}
        <div className={MasterFormStyles.mlmField}>
          <label htmlFor="address" className={MasterFormStyles.mlmLabel}>
            Service Address <span className={MasterFormStyles.mlmRequired}>*</span>
          </label>

          <div className={MasterFormStyles.mlmAddressWrap}>
            <Search
              size={18}
              className={MasterFormStyles.mlmSearchIcon}
              aria-hidden="true"
            />
            <input
              type="text"
              id="address"
              placeholder="Start typing an address..."
              value={addressAutocomplete.address}
              onChange={addressAutocomplete.handleAddressChange}
              onFocus={addressAutocomplete.handleInputFocus}
              onBlur={addressAutocomplete.handleInputBlur}
              onKeyDown={addressAutocomplete.handleKeyDown}
              className={`${MasterFormStyles.mlmInput} ${
                MasterFormStyles.mlmInputWithIcon
              } ${errors.address ? MasterFormStyles.mlmInputError : ""}`}
              aria-autocomplete="list"
              aria-controls={addressAutocomplete.listboxId}
              aria-expanded={addressAutocomplete.suggestions.length > 0}
            />

            {(addressAutocomplete.suggestions.length > 0 ||
              addressAutocomplete.isLoading) && (
              <div className={MasterFormStyles.mlmSuggestionsPanel}>
                {addressAutocomplete.isLoading && (
                  <div className={MasterFormStyles.mlmSuggestionsLoading}>
                    Searching...
                  </div>
                )}

                {addressAutocomplete.suggestions.length > 0 && (
                  <div id={addressAutocomplete.listboxId} role="listbox">
                    {addressAutocomplete.suggestions.map((suggestion, index) => (
                      <div
                        key={`${suggestion.placeId}-${index}`}
                        role="option"
                        aria-selected={index === addressAutocomplete.activeIndex}
                        className={`${MasterFormStyles.mlmSuggestionRow} ${
                          index === addressAutocomplete.activeIndex
                            ? MasterFormStyles.mlmSuggestionRowActive
                            : ""
                        }`}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          addressAutocomplete.handleSelectSuggestion(suggestion);
                        }}
                      >
                        <MapPin
                          size={18}
                          className={MasterFormStyles.mlmPinIcon}
                          aria-hidden="true"
                        />
                        <span className={MasterFormStyles.mlmSuggestionText}>
                          {suggestion.address}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {errors.address && (
            <p className={MasterFormStyles.mlmErrorText}>{errors.address}</p>
          )}

          <div className={MasterFormStyles.mlmMapShell}>
            <div ref={addressAutocomplete.mapRef} className={MasterFormStyles.mlmMap} />
          </div>
        </div>

        {/* Emergency + Submit */}
        <div className={MasterFormStyles.mlmFooterRow}>
          <label className={MasterFormStyles.mlmToggleLabel}>
            <span className={MasterFormStyles.mlmToggleWrap}>
              <input
                type="checkbox"
                name="isEmergency"
                checked={formData.isEmergency}
                onChange={handleInputChange}
                className={MasterFormStyles.mlmToggleInput}
              />
              <span className={MasterFormStyles.mlmToggleTrack} aria-hidden="true" />
              <span className={MasterFormStyles.mlmToggleThumb} aria-hidden="true" />
            </span>

            <span className={MasterFormStyles.mlmEmergencyTextWrap}>
              {formData.isEmergency && (
                <AlertTriangle
                  size={18}
                  className={MasterFormStyles.mlmEmergencyIcon}
                  aria-hidden="true"
                />
              )}
              <span
                className={`${MasterFormStyles.mlmEmergencyText} ${
                  formData.isEmergency ? MasterFormStyles.mlmEmergencyTextOn : ""
                }`}
              >
                Is this an emergency?
              </span>
            </span>
          </label>

          <button
            type="button"
            onClick={handleSubmit}
            className={`${MasterFormStyles.mlmSubmitButton} ${
              formData.isEmergency
                ? MasterFormStyles.mlmSubmitEmergency
                : MasterFormStyles.mlmSubmitNormal
            }`}
          >
            {formData.isEmergency ? "Submit Emergency Request" : "Submit Request"}
          </button>
        </div>
      </div>
    </section>
  );
}