import React, { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import Header from "./Header";
import NavBar from "./NavBar";
import RecentGames from "./RecentGames";
import LoadingProgress from "../components/LoadingProgress";
import Atari from "../components/brandsComponents/atari/Atari";
import Nintendo from "../components/brandsComponents/nintendo/nintendo";
import Sega from "../components/brandsComponents/sega/sega";
import Sony from "../components/brandsComponents/sony/sony";

export default function Home() {
  const [activeTab, setActiveTab] = useState("home");
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleImagesLoaded = () => {
    setLoading(false); // Fin du chargement
  };

  useEffect(() => {
    const imageUrls = [
      "/images/GaminRetroLogo.png",
      "/images/GaminRetroTitleSmall.png",
    ];

    const preloadImages = async () => {
      const totalImages = imageUrls.length;
      let loadedImages = 0;

      const imagePromises = imageUrls.map(
        (src) =>
          new Promise((resolve, reject) => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
              loadedImages++;
              setLoadingProgress((loadedImages / totalImages) * 100);
              resolve();
            };
            img.onerror = reject;
          })
      );

      try {
        await Promise.all(imagePromises);
        setIsTransitioning(true);
        setTimeout(() => {
          setLoading(false); // Retire l'état de chargement une fois les images prêtes
        }, 500); // Petite transition pour rendre le tout fluide
      } catch (error) {
        console.error("Failed to load images:", error);
        setLoading(false);
      }
    };

    preloadImages();
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <RecentGames />;
      case "atari":
        return <Atari />;
      case "nintendo":
        return <Nintendo />;
      case "sega":
        return <Sega />;
      case "sony":
        return <Sony />;
      default:
        return <RecentGames />;
    }
  };

  if (loading) {
    return (
      <LoadingProgress
        progress={loadingProgress}
        isTransitioning={isTransitioning}
      />
    );
  }

  return (
    <div className={styles.mainContainer}>
      <Header onImagesLoaded={handleImagesLoaded} />
      <NavBar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className={styles.content}>{renderContent()}</div>
    </div>
  );
}
