// CustomerForm.example.jsx
import React from "react";
import CustomerForm from "./CustomerForm";

/**
 * Example:
 * Resolve theme at a higher level (Layout/App) and pass it down.
 * Replace `theme="dark"` with your real theme source.
 */
export function CustomerFormExample() {
  const theme = "dark"; // Example only. In your app, derive this once at the layout/root level.

  const handleSubmit = async (payload) => {
    await new Promise((r) => setTimeout(r, 600));
    // Later: await quoteAPI.submitQuote(payload);
    // eslint-disable-next-line no-console
    console.log("Submitted quote request:", payload);
  };

  return (
    <div style={{ padding: "24px" }}>
      <CustomerForm onSubmit={handleSubmit} />
    </div>
  );
}
