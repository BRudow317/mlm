import { FormShell, FormStyles, Label } from '../../components';
import { EmailInput, PasswordInput } from '../';
import LoginButton from './LoginButton';

function LoginForm({ credentials, handleChange, handleSubmit, loading = false }) {
  return (
    <FormShell>
      <form onSubmit={handleSubmit} aria-label="Account login form" className={FormStyles.stack}>
        <div className={FormStyles.stack}>
          <div className={FormStyles.stack}>
            <Label htmlFor="email">Email or Username</Label>
            <EmailInput value={credentials.email} onChange={handleChange} />
          </div>

          <div className={FormStyles.stack}>
            <div className={FormStyles.row}>
              <Label htmlFor="password">Password</Label>
              <a href="#forgot-password">Forgot Password?</a>
            </div>
            <PasswordInput value={credentials.password} onChange={handleChange} />
          </div>

          <LoginButton loading={loading} />
        </div>
      </form>
    </FormShell>
  );
}

export default LoginForm;