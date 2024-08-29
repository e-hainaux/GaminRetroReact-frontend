import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/AdminHeader.module.css";
import Image from "next/image";
import { FaPowerOff } from "react-icons/fa";

export default function AdminHeader() {
  const router = useRouter();
  const [logged, setLogged] = useState(true);

  const logout = () => {
    console.log("Log out !");
    router.push("/admin");
  };
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
      <div onClick={logout} className={styles.logoutButton}>
        <div className={styles.logoutIconContainer}>
          <FaPowerOff style={styles.logoutIcon} />
        </div>
      </div>
    </div>
  );
}
