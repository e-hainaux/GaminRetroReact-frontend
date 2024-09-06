import React from "react";
import styles from "../../../styles/brands.module.css";
import Image from "next/image";

export default function Sega() {
  return (
    <div className={styles.mainContainer}>
      <Image
        src="/images/segaLogo.png"
        alt="Logo SEGA"
        width={1200}
        height={401}
        quality={100}
        className={styles.brandImage}
      />
    </div>
  );
}
