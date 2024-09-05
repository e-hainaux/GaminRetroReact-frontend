import React, { useEffect, useState } from "react";

import styles from "../styles/Header.module.css";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";

export default function Header({ onImagesLoaded }) {
  const [imagesLoaded, setImagesLoaded] = useState({
    logo: false,
    title: false,
  });

  useEffect(() => {
    if (imagesLoaded.logo && imagesLoaded.title) {
      onImagesLoaded();
    }
  }, [imagesLoaded, onImagesLoaded]);

  const handleImageLoad = (imageName) => {
    setImagesLoaded((prev) => ({ ...prev, [imageName]: true }));
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
          onLoad={() => handleImageLoad("logo")}
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
          onLoad={() => handleImageLoad("title")}
        />
      </div>
      <div className={styles.searchIconContainer}>
        <FaSearch style={styles.searchIcon} />
      </div>
    </div>
  );
}
