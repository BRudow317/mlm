import banner from "../../assets/MlmBanner.jpg";
import styles from "./LogoBannerStyle.module.css";

function LogoBanner() {
  return (
    <div className={styles.BannerWrapper}>
      <img src={banner} className={styles.BannerImgStyle} alt="mlm-banner" />
    </div>
  );
}
export default LogoBanner;
