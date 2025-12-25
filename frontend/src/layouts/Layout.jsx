import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar/NavBar";
import Header from "./Sections/Header";
import Footer from "./Sections/Footer";
import Body from "./Sections/Body";
import LayoutStyles from "./LayoutStyles.module.css";

const Layout = () => {
  return (
    <div id="Layout" className={LayoutStyles.LayoutContainer}>
      <div className={LayoutStyles.BackgroundWrapper}>
        <div className={LayoutStyles.OuterContainer}>
          <NavBar />

          <div className={` 
            GlassyEffect 
            ${LayoutStyles.GlassWrapper }
          `} style={{
            backgroundColor: "var(--GlassyBackgroundDarker)",
            border: "none"
          }}>
            <Header />
            <Body>
              <Outlet />
            </Body>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
