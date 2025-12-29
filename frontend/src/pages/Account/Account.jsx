import { useState } from "react";
import { LoginForm } from "../../features";

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
    <>
      <h2>Account Login</h2>
      <h3>Sign in to review invoices, request service updates, and stay in sync.</h3>

      <p style={{ marginTop: 0, marginBottom: "1rem", lineHeight: 1.6 }}>
        Use the secure form below whenever you're ready to jump back into the
        Miller Land Management productivity hub.
      </p>

      <LoginForm
        credentials={credentials}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default AccountPage;
