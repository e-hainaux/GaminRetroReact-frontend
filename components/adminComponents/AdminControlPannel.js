import React from "react";
import styles from "../../styles/AdminControlPannel.module.css";

export default function AdminControlPannel({ onTabChange }) {
  return (
    <div className={styles.mainContainer}>
      <ul className={styles.ul}>
        <li className={styles.li}>
          <button className={styles.link} onClick={() => onTabChange("add")}>
            Ajouter
          </button>
        </li>
        <li className={styles.li}>
          <button className={styles.link} onClick={() => onTabChange("update")}>
            Supprimer / Modifier
          </button>
        </li>
      </ul>
    </div>
  );
}
