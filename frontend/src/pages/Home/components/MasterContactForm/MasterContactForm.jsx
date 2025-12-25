// MasterContactForm.jsx
import React, { useEffect, useRef, useState } from "react";
import { MapPin, Search, AlertTriangle, ChevronDown } from "lucide-react";
import MasterFormStyles from "./MasterFormStyles.module.css";
import { DEFAULT_SERVICES } from "../../../..";
import { useAddressAutocomplete, DEV_API_KEY } from "../../../..";

/**
 * Main Form Component
 * - Uses CSS Module (MasterFormStyles.module.css)
 * - No global class strings
 */
export function MasterContactForm({ serviceType, mergeTop = false }) {
  const shellRef = useRef(null);
  const iframeContainerRef = useRef(null);
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
  const [shouldPlayFbVideo, setShouldPlayFbVideo] = useState(false);

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

  // Populate customMessage when serviceType prop changes (from clicking a service card)
  useEffect(() => {
    console.log("MasterContactForm received serviceType:", serviceType);
    if (serviceType && serviceType.trim()) {
      console.log("Populating form with service:", serviceType);
      setShowCustomMessage(true);
      setFormData((prev) => ({
        ...prev,
        serviceType: "",
        customMessage: serviceType,
      }));
    }
  }, [serviceType]);

  // Start/stop FB embed when scrolled into view
  useEffect(() => {
    const node = iframeContainerRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => setShouldPlayFbVideo(entry.isIntersecting),
      {
        threshold: 0.2, // start playback a bit earlier
        rootMargin: "100px 0px 200px 0px", // pre-trigger before fully in view
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const fbBaseSrc =
    "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1438938453892064%2F&show_text=false&width=320&t=0";
  const fbAutoplaySrc = `${fbBaseSrc}&autoplay=1&muted=1&loop=1&playsinline=1`;

  // Debug helper: log padding/margin of this form and its ancestors when enabled
  useEffect(() => {
    if (!import.meta.env.VITE_DEBUG_FORM_SPACING) return;
    if (!shellRef.current) return;

    const chain = [];
    let node = shellRef.current;
    while (node) {
      const cs = window.getComputedStyle(node);
      chain.push({
        tag: node.tagName,
        className: node.className,
        padding: cs.padding,
        margin: cs.margin,
      });
      node = node.parentElement;
    }
    // eslint-disable-next-line no-console
    console.table(chain);
  }, []);

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

    // TODO: Reinstate name validation
    // if (!formData.name.trim()) newErrors.name = "Name is required";

    // TODO: Reinstate email validation
    // if (!formData.email.trim()) newErrors.email = "Email is required";
    // else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
    //   newErrors.email = "Invalid email format";
    // }

    // TODO: Reinstate phone validation
    // if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    // else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
    //   newErrors.phone = "Phone must be 10 digits";
    // }

    // TODO: Reinstate service type validation
    // if (!showCustomMessage && !formData.serviceType) {
    //   newErrors.serviceType = "Please select a service type";
    // }

    // TODO: Reinstate custom message validation
    // if (showCustomMessage && !formData.customMessage.trim()) {
    //   newErrors.customMessage = "Please provide details about your needs";
    // }

    // TODO: Reinstate address validation
    // if (!addressAutocomplete.address.trim()) {
    //   newErrors.address = "Address is required";
    // }

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
              ? "We'll contact you as soon as possible to assist."
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
      id="get-quote"
      className={[
        MasterFormStyles.mlmMasterFormShell,
        mergeTop ? MasterFormStyles.mlmMasterFormShellMergedTop : ""
      ].join(" ")}
      ref={shellRef}
      aria-label="Service request form"
    >
      <header className={MasterFormStyles.mlmMasterFormHeader}>
        
        <h4 className={MasterFormStyles.mlmMasterFormSubtitle}>
          Fill out the form to request a service quote
        </h4>
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
            placeholder="Contact Name"
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
            placeholder="Contact Email"
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
            placeholder="Contact Phone"
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
            {/* TODO: Restore dropdown toggle button once dropdown service selection is fully implemented */}
            {/* <button
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
            </button> */}
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
    <option value="Describe">Custom Message</option>

  {serviceTypes.map((svc) => (
    <option key={svc.id} value={svc.id}>
      {svc.title}
    </option>
  ))}

</select>

              <ChevronDown
                ref={customMessageRef}
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
                placeholder="Please describe how we can help..."
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
              placeholder="Contact Address..."
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
                Is this an Urgent Request?
              </span>
            </span>
          </label>

          <button
            type="button"
            onClick={handleSubmit}
            className={[
              MasterFormStyles.mlmSubmitButton,
              formData.isEmergency
                ? MasterFormStyles.mlmSubmitEmergency
                : "mlmItem", // use your global override here
            ].join(" ")}
          >
            {formData.isEmergency ? "Submit Urgent Request" : "Submit Request"}
          </button>
        </div>
          <div className={MasterFormStyles.mlmMapShell}>
            <div ref={addressAutocomplete.mapRef} className={MasterFormStyles.mlmMap} />
          </div>

          <div style={{ marginTop: "16px" }} ref={iframeContainerRef}>
            <iframe
              title="Facebook video"
              src={shouldPlayFbVideo ? fbAutoplaySrc : fbBaseSrc}
              width="100%"
              height="480"
              style={{ border: "none", overflow: "hidden", maxWidth: "420px" }}
              scrolling="no"
              frameBorder="0"
              allow="autoplay; encrypted-media; picture-in-picture; web-share; fullscreen"
              loading="lazy"
              allowFullScreen
            />
          </div>
        </div>

        
      </div>
    </section>
  );
}