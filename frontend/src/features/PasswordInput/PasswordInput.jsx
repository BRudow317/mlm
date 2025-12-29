import { Input as TextInput } from '../../components';

function PasswordInput({ value, onChange, id = 'password', name = 'password' }) {
  return (
    <TextInput
      id={id}
      name={name}
      type="password"
      value={value}
      onChange={onChange}
      autoComplete="current-password"
    />
  );
}

export default PasswordInput;
