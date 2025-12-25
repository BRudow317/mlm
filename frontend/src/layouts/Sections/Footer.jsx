import React from "react";
//import { DarkTheme,LightTheme, ContainerBorderTheme, createDiagonalGradient } from "../ThemeStyles";
import { useNavigation } from "../../hooks";
import { getPageTitle } from "../../";
// import logo from '../../assets/MlmLogo.jpg';
import banner from "../../assets/MlmBanner.jpg";
import { LayoutStyles } from "../";
import { useTheme } from "../../themes/ThemeContext";
const Footer = function () {
  const { theme, toggleTheme } = useTheme();
  const { activeItem } = useNavigation();
  const pageTitle = getPageTitle(activeItem);

  return (
    <div className={LayoutStyles.FooterContainer}>
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
      <div className={LayoutStyles.HeaderPrimaryWrapperStyle} style={{ marginTop: "20px" }}>
        <img
          src={banner}
          className={LayoutStyles.HeaderImgStyle}
          alt="mlm-banner"
        />
      </div>
    </div>
  );
};
export default Footer;
