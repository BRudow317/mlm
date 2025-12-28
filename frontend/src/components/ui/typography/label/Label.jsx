import styles from './label.module.css';
import styles from '../typography.module.css';

function Label({ htmlFor, children, className = '' }) { 
    return (
        <label htmlFor={htmlFor} className={`${styles.label} ${typographyStyles.label} ${className}`}>
            {children}
        </label>
    );
}
export default Label;