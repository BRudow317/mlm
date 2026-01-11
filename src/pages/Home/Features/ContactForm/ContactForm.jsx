// ContactForm.jsx - Production Implementation
import { useEffect, useState, useCallback } from "react";
import { GoogleAddrAndMap } from "../../../../features/GoogleAddrAndMap/GoogleAddrAndMap";
import {useBreakpoint} from "../../../../context/BreakpointContext";
import {Honeypot} from "../../../../components/Honeypot/Honeypot";
import "./ContactFormStyles.css";
export { ContactForm };

// ============================================================================
// CONFIGURATION
// ============================================================================
const DEBOUNCE_TIME = 1200; // Tunable - will be refined in UX testing

// Field validation configuration - Single source of truth
const FORM_CONFIG = {
  name: {
    label: "Name",
    type: "text",
    placeholder: "Name",
    autoComplete: "name",
    required: true,
    validate: (value) => {
      if (!value.trim()) return 'Name is required';
      return null;
    },
  },
  email: {
    label: "Email Address",
    type: "email",
    placeholder: "Email Address",
    autoComplete: "email",
    validate: (value, formData) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (value.trim() && !emailRegex.test(value)) {
        return 'Invalid email format';
      }
      if (!value.trim() && !formData.phone?.trim()) {
        return 'Email or phone required';
      }
      return null;
    },
    crossValidate: ['phone'],
  },
  phone: {
    label: "Phone Number",
    type: "tel",
    placeholder: "Phone Number",
    autoComplete: "tel",
    inputMode: "tel",
    validate: (value, formData) => {
      const phoneRegex = /^[0-9()\-/\s]*$/;
      if (value.trim() && !phoneRegex.test(value)) {
        return 'Invalid phone format';
      }
      if (!value.trim() && !formData.email?.trim()) {
        return 'Email or phone required';
      }
      return null;
    },
    crossValidate: ['email'],
  },
  address: {
    label: "Service Address",
    type: "google-address",
    placeholder: "Type Address...",
    required: false,
    validate: (value) => (!value.trim() ? "Address is required" : null),
  },
  customMessage: {
    label: "Service Type",
    type: "textarea",
    placeholder: "How can we help?...",
    rows: 4,
    required: false,
  },

};



// ============================================================================
// MULTI-FIELD DEBOUNCE HOOK
// ============================================================================
function useFieldDebounces(config, activeFields, debounceTime, onValidate) {
  useEffect(() => {
    const timeouts = {};
    
    // Set up a timeout for each active field
    Object.keys(config).forEach(fieldName => {
      if (activeFields[fieldName]) {
        timeouts[fieldName] = setTimeout(() => {
          // Trigger validation callback after debounce completes
          onValidate(fieldName);
        }, debounceTime);
      }
    });
    
    // Cleanup: clear all timeouts if dependencies change (user keeps typing)
    return () => {
      Object.values(timeouts).forEach(clearTimeout);
    };
  }, [config, activeFields, debounceTime, onValidate]);
}

// ============================================================================
// FORM VALIDATION HOOK
// ============================================================================
function useFormValidation(config) {
  // Form data
  const [formData, setFormData] = useState(() => {
    const initial = {};
    Object.keys(config).forEach(key => {
      initial[key] = "";
    });
    return initial;
  });

  // Field states: 'default' | 'active' | 'validated' | 'warning' | 'error' | 'locked'
  const [fieldStates, setFieldStates] = useState({});

  // Validation errors
  const [errors, setErrors] = useState({});

  // Track which fields are actively being edited (for debouncing)
  const [activeFields, setActiveFields] = useState({});

  // Form submission state
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Validate a single field
  const validateField = useCallback((fieldName, value = null) => {
    const fieldConfig = config[fieldName];
    if (!fieldConfig?.validate) return null;

    const valueToValidate = value !== null ? value : formData[fieldName];
    return fieldConfig.validate(valueToValidate, formData);
  }, [config, formData]);

  // Run validation and update state (called after debounce completes)
  const runValidation = useCallback((fieldName) => {
    if (isSubmitted) return; // Don't validate if form is locked

    const error = validateField(fieldName);
    
    setFieldStates(prev => ({
      ...prev,
      [fieldName]: error ? 'warning' : 'validated'
    }));

    setErrors(prev => ({
      ...prev,
      [fieldName]: error
    }));

    // Cross-validate dependent fields if they're not active
    const fieldConfig = config[fieldName];
    if (fieldConfig.crossValidate) {
      fieldConfig.crossValidate.forEach(dependentField => {
        if (!activeFields[dependentField] && fieldStates[dependentField]) {
          const dependentError = validateField(dependentField);
          setFieldStates(prev => ({
            ...prev,
            [dependentField]: dependentError ? 'warning' : 'validated'
          }));
          setErrors(prev => ({
            ...prev,
            [dependentField]: dependentError
          }));
        }
      });
    }

    // Mark field as no longer active
    setActiveFields(prev => ({ ...prev, [fieldName]: false }));

    return error;
  }, [validateField, isSubmitted, config, activeFields, fieldStates]);

  // Use the custom debounce hook for all fields
  useFieldDebounces(config, activeFields, DEBOUNCE_TIME, runValidation);

  // Handle input change
  const handleChange = (e) => {
    if (isSubmitted) return; // Don't allow changes if locked

    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData(prev => ({ ...prev, [name]: newValue }));

    // Mark field as active (white border, timer starts)
    setActiveFields(prev => ({ ...prev, [name]: true }));
    setFieldStates(prev => ({ ...prev, [name]: 'active' }));

    // Clear error
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  // Handle user actions that reset timer (focus, paste, cut, etc.)
  const handleFieldAction = (fieldName) => {
    if (isSubmitted) return;

    setActiveFields(prev => ({ ...prev, [fieldName]: true }));
    setFieldStates(prev => ({ ...prev, [fieldName]: 'active' }));
  };

  // Handle blur - instant validation (no debounce)
  const handleBlur = (fieldName) => {
    if (isSubmitted) return;

    setActiveFields(prev => ({ ...prev, [fieldName]: false }));
    
    // Instant validation on blur
    const error = validateField(fieldName);
    setFieldStates(prev => ({
      ...prev,
      [fieldName]: error ? 'warning' : 'validated'
    }));
    setErrors(prev => ({
      ...prev,
      [fieldName]: error
    }));
  };

  // Validate entire form (for submission)
  const validateForm = () => {
    const newErrors = {};
    const newStates = {};
    
    Object.keys(config).forEach(fieldName => {
      const error = validateField(fieldName);
      if (error) {
        newErrors[fieldName] = error;
        // Orange fields become red on submit attempt
        newStates[fieldName] = fieldStates[fieldName] === 'warning' ? 'error' : 'warning';
      } else {
        newStates[fieldName] = 'validated';
      }
    });

    setErrors(newErrors);
    setFieldStates(prev => ({ ...prev, ...newStates }));

    return Object.keys(newErrors).length === 0;
  };

  // submit form
  const submitForm = async (payload) => {
    const isValid = validateForm();
    
    if (!isValid) {
      return false;
    }

    // Lock all fields (green, disabled)
    const lockedStates = {};
    Object.keys(config).forEach(fieldName => {
      lockedStates[fieldName] = 'locked';
    });
    setFieldStates(lockedStates);
    setIsSubmitted(true);

    try {
      const response = await fetch("/api/public/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      setShowSuccess(true);
      return true;
    } catch (error) {
      console.error("Form submission error:", error);
      // Unlock fields on error so user can try again
      setFieldStates(prev => {
        const unlockedStates = { ...prev };
        Object.keys(config).forEach(fieldName => {
          unlockedStates[fieldName] = errors[fieldName] ? 'warning' : 'validated';
        });
        return unlockedStates;
      });
      setIsSubmitted(false);
      alert("Failed to submit form. Please try again.");
      return false;
    }
  };

  // Submit again - unlock fields
  const submitAgain = () => {
    setIsSubmitted(false);
    setShowSuccess(false);
    
    // Reset all locked fields to their validated state
    const unlockedStates = {};
    Object.keys(config).forEach(fieldName => {
      unlockedStates[fieldName] = errors[fieldName] ? 'warning' : 'validated';
    });
    setFieldStates(unlockedStates);
  };

  return {
    formData,
    fieldStates,
    errors,
    isSubmitted,
    showSuccess,
    handleChange,
    handleFieldAction,
    handleBlur,
    submitForm,
    submitAgain,
  };
}

// ============================================================================
// COMPONENT
// ============================================================================
function ContactForm() {

  const screenSize = useBreakpoint();

  const [GoogleAddressInput, GoogleMapBox] = GoogleAddrAndMap();

  const {
    formData,
    fieldStates,
    errors,
    isSubmitted,
    showSuccess,
    handleChange,
    handleFieldAction,
    handleBlur,
    submitForm,
    submitAgain,
  } = useFormValidation(FORM_CONFIG);

  // Handle form submission
  const handleSubmit = async () => {
    const payload = {
      ...formData
    };
    await submitForm(payload);
  };

  // Render field helper
  const renderField = (fieldName, fieldConfig) => {
    const isTextarea = fieldConfig.type === 'textarea';
    const state = fieldStates[fieldName] || 'default';
    const isGoogleAddress = fieldConfig.type === 'google-address';

    const commonProps = {
      id: fieldName,
      name: fieldName,
      value: formData[fieldName] || "",
      onChange: handleChange,
      onFocus: () => handleFieldAction(fieldName),
      onBlur: () => handleBlur(fieldName),
      onPaste: () => handleFieldAction(fieldName),
      onCut: () => handleFieldAction(fieldName),
      placeholder: fieldConfig.placeholder,
      disabled: state === 'locked',
      'data-validation-state': state,
      className: "form-input",
    };

    if (isGoogleAddress) {
      return (
        <GoogleAddressInput
          name="address"
          value={formData.address}
          onChange={handleChange}
          onFocus={() => handleFieldAction("address")}
          onBlur={() => handleBlur("address")}
          onPaste={() => handleFieldAction("address")}
          onCut={() => handleFieldAction("address")}
          disabled={fieldStates.address === "locked"}
          data-validation-state={fieldStates.address || "default"}
          className="form-input form-input-with-icon"
        />
      );
    }

    if (isTextarea) {
      return <textarea {...commonProps} rows={fieldConfig.rows || 4} />;
    }

    return (
      <input
        {...commonProps}
        type={fieldConfig.type}
        autoComplete={fieldConfig.autoComplete}
        inputMode={fieldConfig.inputMode}
      />
    );
  };

  return (
    <div className="section-wrapper">
    <section id="contact-form" aria-label="Contact Form" 
    className={screenSize==='xsm'? "contact-form-section contact-form-section-xsm" : "contact-form-section"}>
      <header className="form-header">
        <h3 className="form-title">Request a Free Service Quote</h3>
      </header>

      <form className={screenSize==='xsm'? "form-stack form-stack-xsm" : "form-stack"}>
        {/* First row: Name, Email, Phone */}
        <div className={`form-grid ${screenSize === 'xsm' ? 'form-grid-mobile' : ''}`}>
          {['name', 'email', 'phone'].map(fieldName => {
            const fieldConfig = FORM_CONFIG[fieldName];
            return (
              <div key={fieldName} className="field">
                <label htmlFor={fieldName} className="label">
                  {fieldConfig.label}
                  {errors[fieldName] && (
                    <span className="error">{errors[fieldName]}</span>
                  )}
                </label>
                {renderField(fieldName, fieldConfig)}
              </div>
            );
          })}
        </div>
        <Honeypot />
        {/* Address */}
        <div className="field field-full-width">
          <label htmlFor="address" className="label">
            Service Address
          </label>
          <div className="address-wrap">
            <GoogleAddressInput
              className="form-input form-input-with-icon"
            />
          </div>
        </div>

        {/* Service Type */}
        <div className="field field-full-width">
          <label htmlFor="customMessage" className="label">
            {FORM_CONFIG.customMessage.label}
          </label>
          {renderField('customMessage', FORM_CONFIG.customMessage)}
        </div>

        {/* TODO: Add more field rows here as needed */}

        {/* Submit / Submit Again */}
        <div className="footer-row">
          {showSuccess && (
            <div className="success-message">
              <span className="success-icon">✓</span>
              <span>Thanks for reaching out! We'll contact you ASAP.</span>
            </div>
          )}
          
          {!isSubmitted ? (
            <button
              type="button"
              onClick={handleSubmit}
              className="submit-button"
            >
              Submit Request
            </button>
          ) : (
            <button
              type="button"
              onClick={submitAgain}
              className="submit-again-button"
            >
              Submit Another Form?
            </button>
          )}
        </div>
      </form>

      {/* Google Maps */}
      <div className="map-shell">
        <GoogleMapBox className="map" />
        <div className="map-overlay" />
      </div>
    </section>
    </div>
  );
}