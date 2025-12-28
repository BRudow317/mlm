import '../MasterFormStyles/MasterFormStyles.module.css';

function PasswordInput({ credentials, handleChange }) {
  return (
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
    );
}
export default PasswordInput;