import { useNavigation } from "../../hooks";
import Styles from "./FooterSectionStyles.module.css";
import { useTheme } from "../../theme/ThemeContext";
import LogoBanner from "../../lib/LogoBanner/LogoBanner.jsx";

// Simple inline implementation (replaces deleted getPageTitle util)
const getPageTitle = (activeItem) => activeItem?.title || "Home";

const Footer = function () {
  const { theme, toggleTheme } = useTheme();
  const { activeItem } = useNavigation();
  const pageTitle = getPageTitle(activeItem);

  return (
    <div className={Styles.FooterContainer}>
      <h4>{pageTitle}</h4>
      <p>© 2025 Miller Land Management. All rights reserved.</p>
      <div style={{ marginTop: "20px", display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
        <h3 style={{ margin: 0 }}>Current Site Theme: {theme}</h3>
        <button
          type="button"
          onClick={toggleTheme}
          className="mlmItem"
          style={{
            padding: "0.55rem 1.4rem",
            borderRadius: "999px",
            fontWeight: 700,
            fontSize: "0.95rem",
          }}
        >
          Toggle Theme
        </button>
      </div>
      <LogoBanner /> 
    </div>
  );
};
export default Footer;
