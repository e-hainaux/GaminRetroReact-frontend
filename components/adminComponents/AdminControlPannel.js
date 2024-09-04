import React from "react";
import styles from "../../styles/AdminControlPannel.module.css";

export default function AdminControlPannel({ onTabChange, activeTab }) {
  return (
    <div className={styles.mainContainer}>
      <ul className={styles.ul}>
        <li className={styles.li}>
          <button
            className={`${styles.link} ${
              activeTab === "add" ? styles.active : ""
            }`}
            onClick={() => onTabChange("add")}
          >
            Ajouter
          </button>
        </li>
        <li className={styles.li}>
          <button
            className={`${styles.link} ${
              activeTab === "update" ? styles.active : ""
            }`}
            onClick={() => onTabChange("update")}
          >
            Supprimer / Modifier
          </button>
        </li>
      </ul>
    </div>
  );
}
