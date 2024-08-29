import React from "react";
import styles from "../../styles/AdminHeader.module.css";
import Image from "next/image";

export default function AdminHeader() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.logoContainer}>
        <Image
          src="/images/GaminRetroLogo.png"
          alt="Logo"
          width={100}
          height={100}
          quality={100}
          className={styles.logoImage}
        />
      </div>
      <div className={styles.titleContainer}>
        <Image
          src="/images/GaminRetroTitleSmall.png"
          alt="Logo"
          width={200}
          height={100}
          quality={100}
          className={styles.titleImage}
          priority={true}
        />
      </div>
    </div>
  );
}
