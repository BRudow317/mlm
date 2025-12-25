import { useMemo, useState, useCallback } from "react";

/**
 * Default service options (you can override via props).
 */
const DEFAULT_SERVICE_OPTIONS = [
  // Placeholder / blank
  { value: "", label: "Leave blank (unsure)" },

  // Explicit "specials"
  { value: "LEAVE_BLANK", label: "Leave Blank" },
  { value: "DESCRIBE", label: "Describe (I'll explain below)" },

  // Business services
  { value: "EMERGENCY_REPAIRS", label: "Emergency Repairs" },
  { value: "DEMOLITION", label: "Demolition" },
  { value: "SEPTIC", label: "Septic Installation / Repair / Replacements" },
  { value: "LAND_GRADING", label: "Commercial & Residential Land Grading" },
  { value: "DEBRIS_REMOVAL", label: "Debris Removal (Tree/Brush/Stump/Stone/Soil)" },
  { value: "MATERIAL_SALES", label: "Material Sales (Mulch/Topsoil/Sand/Gravel/etc.)" },
  { value: "HAULING", label: "Hauling Services" },
  { value: "FOUNDATION_DIGGING", label: "Residential & Commercial Foundation Digging" },
  { value: "DRIVEWAY", label: "Driveway Construction" },
  { value: "FOUNDATION_REPAIR", label: "Residential & Commercial Foundation Repair" },
];

function isValidEmail(email) {
  // Simple check (backend should validate strongly)
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());
}

function normalizePhone(phone) {
  // Keep digits; let backend decide final formatting
  return String(phone || "").replace(/[^\d]/g, "");
}

export function useCustomerForm({ onSubmit, serviceOptions }) {
  const serviceTypeOptions = useMemo(
    () => (Array.isArray(serviceOptions) && serviceOptions.length > 0 ? serviceOptions : DEFAULT_SERVICE_OPTIONS),
    [serviceOptions]
  );

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    serviceType: "",
    details: "",
    company: "", // honeypot
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);

  const shouldShowDetails =
    form.serviceType === "" || form.serviceType === "LEAVE_BLANK" || form.serviceType === "DESCRIBE";

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error as user edits
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });

    // Clear submit message as user changes inputs
    setSubmitResult(null);
  }, []);

  const handleServiceTypeChange = useCallback(
    (e) => {
      const { value } = e.target;

      setForm((prev) => ({
        ...prev,
        serviceType: value,
        // If user chooses a specific service, clear details (optional).
        // Keeping details can be useful; comment out if you prefer to retain it.
        details: value === "" || value === "LEAVE_BLANK" || value === "DESCRIBE" ? prev.details : prev.details,
      }));

      setErrors((prev) => {
        if (!prev.serviceType && !prev.details) return prev;
        const next = { ...prev };
        delete next.serviceType;
        delete next.details;
        return next;
      });

      setSubmitResult(null);
    },
    []
  );

  const validate = useCallback(() => {
    const nextErrors = {};

    if (!form.name.trim()) nextErrors.name = "Name is required.";
    if (!form.email.trim()) nextErrors.email = "Email is required.";
    else if (!isValidEmail(form.email)) nextErrors.email = "Enter a valid email address.";

    const phoneDigits = normalizePhone(form.phone);
    if (!form.phone.trim()) nextErrors.phone = "Phone number is required.";
    else if (phoneDigits.length < 10) nextErrors.phone = "Enter a valid phone number (10+ digits).";

    if (!form.address.trim()) nextErrors.address = "Address is required.";

    // If user left service type blank/describe, strongly encourage details.
    if (shouldShowDetails && !form.details.trim()) {
      nextErrors.details = "Please add a short description so we know what to quote.";
    }

    return nextErrors;
  }, [form, shouldShowDetails]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      // Honeypot check: if filled, silently pretend success (bot).
      if (form.company && form.company.trim().length > 0) {
        setSubmitResult({ type: "success", message: "Thanks—your request has been received." });
        return;
      }

      const nextErrors = validate();
      setErrors(nextErrors);

      if (Object.keys(nextErrors).length > 0) {
        setSubmitResult({ type: "error", message: "Please fix the highlighted fields and try again." });
        return;
      }

      setIsSubmitting(true);
      setSubmitResult(null);

      // Build payload for your backend (keep it clean and explicit)
      const payload = {
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        phone: form.phone.trim(),
        address: form.address.trim(),
        serviceType: form.serviceType || null,
        details: form.details.trim() || null,
      };

      try {
        if (typeof onSubmit === "function") {
          await onSubmit(payload);
        } else {
          // Default behavior for development: log to console
          // In production, pass an onSubmit that calls your API service.
          // eslint-disable-next-line no-console
          console.log("CustomerForm payload:", payload);
        }

        setSubmitResult({ type: "success", message: "Request received. We’ll reach out soon." });

        // Optional: reset form after success
        setForm({
          name: "",
          email: "",
          phone: "",
          address: "",
          serviceType: "",
          details: "",
          company: "",
        });
      } catch (err) {
        setSubmitResult({
          type: "error",
          message: err?.message || "Something went wrong submitting the request. Please try again.",
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [form, onSubmit, validate]
  );

  return {
    form,
    errors,
    isSubmitting,
    submitResult,
    serviceTypeOptions,
    shouldShowDetails,
    handleChange,
    handleServiceTypeChange,
    handleSubmit,
  };
}
