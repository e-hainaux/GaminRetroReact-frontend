import React from "react";
import styles from "../../../styles/brands.module.css";
import Image from "next/image";

export default function Nintendo() {
  return (
    <div className={styles.mainContainer}>
      <Image
        src="/images/nintendoLogo.png"
        alt="Logo NINTENDO"
        width={100}
        height={100}
        quality={100}
        className={styles.brandImage}
      />
    </div>
  );
}
