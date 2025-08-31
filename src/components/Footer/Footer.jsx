import styles from "./styles.module.css";
import { useState } from "react";

function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <div className={`container ${styles.footer_container}`}>
          <div className={styles.logo}>
            Movie<span>mix</span>
          </div>
          <div className={styles.copyright}>©{new Date().getFullYear()}</div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
