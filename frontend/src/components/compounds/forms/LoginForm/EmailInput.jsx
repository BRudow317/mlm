import 'EmailInputStyle.module.css';
function EmailInput({ credentials, handleChange }) {
  return (
        <input
            type="email"
            id="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            className={`${EmailInputStyle.mlmInput}`}
            placeholder="you@example.com"
            required
        />
    );
}
export default EmailInput;