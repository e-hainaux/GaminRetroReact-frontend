import React from "react";
import styles from "../styles/NavBar.module.css";

export default function NavBar() {
  return (
    <div className={styles.mainContainer}>
      <ul className={styles.ul}>
        <li className={styles.li}>
          <a href="#" className={styles.link}>
            Accueil
          </a>
        </li>
        <li className={styles.li}>
          <a href="#" className={styles.link}>
            Atari
          </a>
        </li>
        <li className={styles.li}>
          <a href="#" className={styles.link}>
            Nintendo
          </a>
        </li>
        <li className={styles.li}>
          <a href="#" className={styles.link}>
            Sega
          </a>
        </li>
        <li className={styles.li}>
          <a href="#" className={styles.link}>
            Sony
          </a>
        </li>
      </ul>
    </div>
  );
}
