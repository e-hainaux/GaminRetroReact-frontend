import React from "react";
import styles from "../styles/LoadingProgress.module.css";

export default function LoadingProgress({ progress, isTransitioning }) {
  return (
    <div
      className={`${styles.progressContainer} ${
        isTransitioning ? styles.fadeOut : ""
      }`}
    >
      <div
        className={styles.progressBar}
        style={{ width: `${progress}%` }}
      ></div>
      <div className={styles.progressText}>
        Chargement en cours {Math.round(progress)}%
      </div>
    </div>
  );
}
