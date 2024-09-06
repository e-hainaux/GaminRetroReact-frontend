import React from "react";
import styles from "../../../styles/brands.module.css";
import Image from "next/image";

export default function Sony() {
  return (
    <div className={styles.mainContainer}>
      <Image
        src="/images/sonyLogo.png"
        alt="Logo SONY"
        width={1200}
        height={201}
        quality={100}
        className={styles.brandImage}
      />
    </div>
  );
}
