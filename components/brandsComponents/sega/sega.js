import React from "react";
import styles from "../../../styles/brands.module.css";
import Image from "next/image";

export default function Sega() {
  return (
    <div className={styles.mainContainer}>
      <Image
        src="/images/segaLogo.png"
        alt="Logo SEGA"
        width={100}
        height={100}
        quality={100}
        className={styles.brandImage}
      />
    </div>
  );
}
