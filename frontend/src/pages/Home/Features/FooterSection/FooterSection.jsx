import * as HomeStyles from "../../HomeStyles.module.css";
export { FooterSection };

function FooterSection() {
  const styles = {
    /* Footer */
    footer: {
      /* background-color: #0a0a0a; */
      padding: `60px 20px`,
      borderTop: `1px solid #222`,
      background: `var(--tint-75)`
    },

    footerH3: {
      fontSize: `1.8rem`,
      fontWeight: 400,
      marginBottom: `15px`,
    },

    footerP: {
      color: `#888`,
      fontSize: `1rem`,
      lineHeight: `1.6`,
      marginBottom: `40px`,
      maxWidth: `600px`,
    },

    footerNavH4: {
      color: `#666`,
      fontSize: `0.9rem`,
      fontWeight: 600,
      textTransform: `uppercase`,
      letterSpacing: `1px`,
      marginBottom: `15px`,
    },

    footerNavA: {
      color: `#888`,
      textDecoration: `none`,
      display: `block`,
      marginBottom: `10px`,
      fontSize: `1rem`,
    },

    footerNavAHover: {
      color: `#fff`,
    },
  };
  return (
    <>
      {/* Footer */}
      <footer style={styles.footer}>
        <h3 style={styles.footerH3}>Miller Land Management</h3>
        <p style={styles.footerP}>
          Serving Indianapolis and surrounding areas with trusted excavation and
          land management solutions.
        </p>

        <div style={styles.footerNav}>
          <h4 style={styles.footerNavH4}>Navigation</h4>
          <a style={styles.footerNavA}>Home</a>
        </div>
      </footer>
    </>
  );
}
