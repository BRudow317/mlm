import React, { useState } from "react";
import PageSection from "../../components/PageSection/PageSection";
import MasterFormStyles from "../Home/components/MasterContactForm/MasterFormStyles.module.css";

const AccountPage = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: wire into real auth flow when available
    console.log("Account login attempt", credentials);
  };

  return (
    <PageSection
      heading="Account Login"
      subtitle="Sign in to review invoices, request service updates, and stay in sync."
    >
      <p style={{ marginTop: 0, marginBottom: "1rem", lineHeight: 1.6 }}>
        Use the secure form below whenever you're ready to jump back into the
        Miller Land Management productivity hub.
      </p>

      <form
        className={MasterFormStyles.mlmMasterFormShell}
        onSubmit={handleSubmit}
        aria-label="Account login form"
      >
        <div className={MasterFormStyles.mlmFormStack}>
          <div className={MasterFormStyles.mlmField}>
            <label htmlFor="email" className={MasterFormStyles.mlmLabel}>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              className={`${MasterFormStyles.mlmInput}`}
              placeholder="you@example.com"
              required
            />
          </div>
          <div className={MasterFormStyles.mlmField}>
            <div className={MasterFormStyles.mlmFieldRow}>
              <label htmlFor="password" className={MasterFormStyles.mlmLabel}>
                Password
              </label>
              <a
                href="#forgot-password"
                style={{
                  fontSize: "12px",
                  color: "var(--mlmLightGreen)",
                  textDecoration: "underline",
                }}
              >
                Forgot Password?
              </a>
            </div>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              className={MasterFormStyles.mlmInput}
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            className={[
              MasterFormStyles.mlmSubmitButton,
              MasterFormStyles.mlmSubmitEmergency,
            ].join(" ")}
            style={{
              width: "100%",
              background: "var(--mlmNavy)",
              borderColor: "var(--GlobalTextColor)",
              color: "var(--GlobalTextColor)",
            }}
          >
            Sign In
          </button>
        </div>
      </form>

    </PageSection>
  );
};

export default AccountPage;
