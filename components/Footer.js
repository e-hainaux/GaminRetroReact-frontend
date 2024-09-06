import React from "react";
import styles from "../styles/Footer.module.css";
import { FaLinkedin, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <div className={styles.mainContainer}>
      <p className={styles.text}>Created by Emilien Hainaux © 2024</p>
      <div className={styles.links}>
        <a
          href="https://www.linkedin.com/in/e-hainaux"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className={styles.link}
        >
          <FaLinkedin size={24} />
        </a>
        <a
          href="https://github.com/e-hainaux"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className={styles.link}
        >
          <FaGithub size={24} />
        </a>
      </div>
    </div>
  );
}
