// CustomerForm.jsx (only the minimal changes needed for the renamed styles + responsive class)
import React, { useMemo } from "react";
import { CustomerFormStyles } from "./CustomerForm.css.js";
import css from "./CustomerForm.module.css";
import { useCustomerForm } from "./useCustomerForm.hook";

export default function CustomerForm({ onSubmit, serviceOptions }) {
  const styles = () => CustomerFormStyles;

  const {
    form,
    errors,
    isSubmitting,
    submitResult,
    serviceTypeOptions,
    shouldShowDetails,
    handleChange,
    handleServiceTypeChange,
    handleSubmit,
  } = useCustomerForm({ onSubmit, serviceOptions });

  return (
    <section style={styles.container} aria-label="Request a quote form">
      <header style={styles.header}>
        <h2 style={styles.title}>Request a Quote</h2>
        <p style={styles.subtitle}>
          Share your contact info and a quick description. We’ll follow up with an estimate.
        </p>
      </header>

      <form style={styles.form} onSubmit={handleSubmit} noValidate>
        <div style={styles.honeypotWrap} aria-hidden="true">
          <label style={styles.label} htmlFor="company">
            Company (leave blank)
          </label>
          <input
            id="company"
            name="company"
            className={css.input}
            style={styles.input}
            value={form.company}
            onChange={handleChange}
            autoComplete="off"
            tabIndex={-1}
          />
        </div>

        {/* Add css.grid to allow responsive media queries */}
        <div className={css.grid} style={styles.grid}>
          {/* ...unchanged fields... */}
        </div>

        <div style={styles.actions}>
          <button
            type="submit"
            className={css.button}
            style={styles.button}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Request Quote"}
          </button>

          {submitResult?.type === "success" && (
            <div style={styles.successText} role="status" aria-live="polite">
              {submitResult.message}
            </div>
          )}

          {submitResult?.type === "error" && (
            <div style={styles.errorText} role="alert">
              {submitResult.message}
            </div>
          )}
        </div>
      </form>
    </section>
  );
}
