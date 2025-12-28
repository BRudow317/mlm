import styles from './BackgroundStyles.module.css';

function Background({ children }) {
    return <div className={styles.BackgroundWrapper}>{children}</div>;
}

export default Background;