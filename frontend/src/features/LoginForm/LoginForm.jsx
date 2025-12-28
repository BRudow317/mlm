import '../MasterFormStyles/MasterFormStyles.module.css';
import EmailInput from '../EmailInput/EmailInput';
import LoginButton from './LoginButton';
import PasswordInput from './PasswordInput';

  /*
const AccountPage = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  */
 

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
            <EmailInput credentials={credentials} handleChange={handleChange} />
          </div>
          <div className={MasterFormStyles.mlmField}>
            <div className={MasterFormStyles.mlmFieldRow}>
              <label htmlFor="password" className={MasterFormStyles.mlmLabel}>
                Password
              </label>
              <a
                href="#forgot-password"
                className={MasterFormStyles.mlmForgotPassword}
              >
                Forgot Password?
              </a>
            </div>
            <PasswordInput credentials={credentials} handleChange={handleChange} />
          </div>
          <LoginButton onSubmit={handleSubmit} />
        </div>
      </form>
    );
}
export default LoginForm;