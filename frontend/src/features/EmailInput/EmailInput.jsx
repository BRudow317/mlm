import { Input as TextInput } from '../../components';
function EmailInput({ 
    value,
    onChange,
    id = "email",
    name = "email",
    autoComplete = "email",
    required = false
}) {
  return (
        <TextInput
            type="email"
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            className={`${EmailInputStyle.mlmInput}`}
            placeholder="you@example.com"
            required={required}
            autoComplete={autoComplete}
        />
    );
}
export default EmailInput;