import React from "react";
import styles from "../../../styles/brands.module.css";
import Image from "next/image";

export default function Nintendo() {
  return (
    <div className={styles.mainContainer}>
      <Image
        src="/images/nintendoLogo.png"
        alt="Logo NINTENDO"
        width={2000}
        height={755}
        quality={100}
        className={styles.brandImage}
      />
    </div>
  );
}
