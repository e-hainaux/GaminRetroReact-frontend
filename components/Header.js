import React, { useEffect, useState } from "react";

import styles from "../styles/Header.module.css";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import SearchModal from "./SearchModal";

export default function Header({ onImagesLoaded }) {
  const [imagesLoaded, setImagesLoaded] = useState({
    logo: false,
    title: false,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (imagesLoaded.logo && imagesLoaded.title) {
      onImagesLoaded();
    }
  }, [imagesLoaded, onImagesLoaded]);

  const handleImageLoad = (imageName) => {
    setImagesLoaded((prev) => ({ ...prev, [imageName]: true }));
  };

  const handleSearchClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.blockOne}>
        <div className={styles.logoContainer}>
          <Image
            src="/images/GaminRetroLogo.png"
            alt="Logo"
            width={500}
            height={500}
            quality={100}
            className={styles.logoImage}
            onLoad={() => handleImageLoad("logo")}
          />
        </div>
        <div className={styles.titleContainer}>
          <Image
            src="/images/GaminRetroTitleTransparent.png"
            alt="Logo"
            width={500}
            height={250}
            quality={100}
            className={styles.titleImage}
            priority={true}
            onLoad={() => handleImageLoad("title")}
          />
        </div>
      </div>

      <div className={styles.blockTwo}>
        <div className={styles.searchIconContainer}>
          <FaSearch
            size={"1em"}
            style={styles.searchIcon}
            onClick={handleSearchClick}
          />
        </div>
      </div>

      {isModalOpen && <SearchModal onClose={handleCloseModal} />}
    </div>
  );
}
