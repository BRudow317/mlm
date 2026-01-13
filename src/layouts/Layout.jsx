import { Outlet } from "react-router-dom";
import { AdBar } from "../features/AdBar/AdBar";
import MlmBanner from "../assets/MlmBanner.jpg";
import {useBreakpoint} from "../context/BreakpointContext";

export function Layout() {
  const screenSize = useBreakpoint();
  const isMobile = screenSize === "xsm" || screenSize === "sm";

  const styles = {
    SiteContainer: {
      width: "100%",
      height: "100%",
      padding: 0,
      margin: 0,
      boxSizing: "border-box",

    },

    AppContainer: {
      width: "100%",
      height: "100%",
      padding: 0,
      margin: 0,
      boxSizing: "border-box",
      color: "var(--text-color)",
      backgroundColor: "var(--tint-50)",
    },

    BackgroundImage: {
      isolation: "isolate",
      zIndex: -5,
      position: "fixed",
      inset: 0,
      padding: 0,
      margin: 0,
      backgroundImage: `url(${MlmBanner})`,
      backgroundAttachment: "scroll",
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "50% 20%",
      backgroundColor: "black",

    },
  };

  return (
    // <div style={styles.SiteContainer}>
    <>
      <div style={styles.BackgroundImage} />
      <div style={styles.AppContainer}>
        <AdBar />
        <Outlet />
      </div>
      </>
  );
}
