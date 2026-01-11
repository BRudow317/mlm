import { NavLink } from "react-router-dom";
import icon from '../../assets/MillerIcon.ico';
// import { useNavigation } from '../../hooks';
import styles from './NavBar.module.css';
import { useLocation } from 'react-router-dom';
import { NAV_NAMES } from '../../constants/ROUTES.js';
export { NavBar };

function useNavigation() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const getCurrentPageName = () => {
    return NAV_NAMES.find((item) => item.path === location.pathname)?.name || 'Miller Land Management';
  };

  return {
    currentPath: location.pathname,
    isActive,
    getCurrentPageName,
    navItems: NAV_NAMES,
  };
};

function NavBar() {

const { navItems } = useNavigation();

  return (
    <>
      <div className={styles.navKickerBar}>Miller Land Management</div>
      <header className={styles.navShell}>
      <div className={styles.navBrand}>
        <NavLink
          to="/"
          end
          className={styles.navLogo}
          aria-label="Go to Miller Land Management home"
        >
          {/* Stable: always show the icon image */}
          <img src={icon} alt="Miller Land Management" className={styles.navLogoImg} />
        </NavLink>
        <div className={styles.navMeta}>
          <span className={styles.navKicker}>Miller Land Management</span>
        </div>
      </div>

      <nav className={styles.navLinks} aria-label="Primary navigation">
        <ul className={styles.navList}>
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navLink} ${styles.active}`
                    : styles.navLink
                }
              >
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      </header>
    </>
  );
};
