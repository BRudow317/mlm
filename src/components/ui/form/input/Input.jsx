import styles from './Input.module.css';

function Input({ type = 'text', id, value, onChange, placeholder = '', className = '', ...rest }) {
    return (
        <input
            type={type}
            id={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`${styles.input} ${className}`}
            {...rest}
        />
    );
}

export default Input;