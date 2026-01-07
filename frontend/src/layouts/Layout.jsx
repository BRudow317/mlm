import { Outlet } from "react-router-dom";
import { AdBar } from "../features/AdBar/AdBar";
import MlmBanner from "../assets/MlmBanner.jpg";


//App children will be the routed pages
//Pages should use fragments if they want to use "MainSection" as their wrapper.
export function Layout() {
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
      width: "100%",
      height: "100%",
      top: 0,
      left: 0,
      padding: 0,
      margin: 0,

      backgroundImage: `url(${MlmBanner})`,
      backgroundAttachment: "fixed",
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
