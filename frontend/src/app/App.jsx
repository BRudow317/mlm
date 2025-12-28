import { Outlet } from "react-router-dom";
import {
  NavBar,
  Background,
  HeaderSection,
  FooterSection,
  MainSection,
} from "./";
import styles from "./AppStyles.module.css";

//App children will be the routed pages
//Pages should use fragments if they want to use "MainSection" as their wrapper.
export function App() {
  return (
    <div className={styles.OuterContainer}>
      <Background>
        <div className={styles.LayoutContainer}>
          <NavBar />
          <HeaderSection />
          <MainSection>
            <Outlet />
          </MainSection>
          <FooterSection />
        </div>
      </Background>
    </div>
  );
}
