import Button from '../../components/ui/button/Button';

function LoginButton({ loading = false }) {
  return (
    <Button type="submit" variant="primary" fullWidth loading={loading}>
      Log In
    </Button>
  );
}

export default LoginButton;