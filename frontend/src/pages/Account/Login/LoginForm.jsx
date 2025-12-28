import MasterFormStyles from '../../../lib/forms/MasterFormStyles/MasterFormStyles.module.css';

function LoginForm({ credentials, handleChange, handleSubmit }) {
    return (
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
    );
}

export default LoginForm;