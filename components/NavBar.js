import React, { useState } from "react";
import styles from "../styles/NavBar.module.css";

export default function NavBar({ onTabChange, activeTab }) {
  return (
    <div className={styles.mainContainer}>
      <ul className={styles.ul}>
        <li className={styles.li}>
          <button
            className={`${styles.link} ${
              activeTab === "home" ? styles.active : ""
            }`}
            onClick={() => onTabChange("home")}
          >
            Accueil
          </button>
        </li>
        <li className={styles.li}>
          <button
            className={`${styles.link} ${
              activeTab === "atari" ? styles.active : ""
            }`}
            onClick={() => onTabChange("atari")}
          >
            Atari
          </button>
        </li>
        <li className={styles.li}>
          <button
            className={`${styles.link} ${
              activeTab === "nintendo" ? styles.active : ""
            }`}
            onClick={() => onTabChange("nintendo")}
          >
            Nintendo
          </button>
        </li>
        <li className={styles.li}>
          <button
            className={`${styles.link} ${
              activeTab === "sega" ? styles.active : ""
            }`}
            onClick={() => onTabChange("sega")}
          >
            Sega
          </button>
        </li>
        <li className={styles.li}>
          <button
            className={`${styles.link} ${
              activeTab === "sony" ? styles.active : ""
            }`}
            onClick={() => onTabChange("sony")}
          >
            Sony
          </button>
        </li>
      </ul>
    </div>
  );
}
