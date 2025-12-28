import banner from "../../assets/MlmBanner.jpg";
import Styles from "./LogoBannerStyle.module.css";

function LogoBanner() {
  return (
    <div className={Styles.BannerWrapperStyle}>
      <img src={banner} className={Styles.BannerImgStyle} alt="mlm-banner" />
    </div>
  );
}
export default LogoBanner;
