import React from "react";
import styles from "../styles/RecentGames.module.css";

export default function RecentGames() {
  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.title}>Récemment ajoutés</h1>
      <div className={styles.gamesContainer}></div>
    </div>
  );
}
