import React, { useEffect, useState } from "react";
import Image from "next/image";

import styles from "../../styles/AdminConnectScreen.module.css";
import ConnectionFrame from "./ConnectionFrame";

export default function AdminConnectScreen() {
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

      <ConnectionFrame />
    </div>
  );
}
