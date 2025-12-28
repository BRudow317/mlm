import 'LoginButtonStyle.module.css';

const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: wire into real auth flow when available
    console.log("Account login attempt", credentials);
  };


function LoginButton({ onSubmit }) {
    return (
        <button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            style={[
              LoginButtonStyle.mlmSubmitButton,
              LoginButtonStyle.mlmSubmitEmergency,
              LoginButtonStyle.LoginButton
            ]}
          >
            Sign In
          </button>
    );
}
export default LoginButton;