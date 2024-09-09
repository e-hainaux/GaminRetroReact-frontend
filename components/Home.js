import React, { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import Header from "./Header";
import NavBar from "./NavBar";
import Footer from "./Footer";
import LoadingProgress from "../components/LoadingProgress";
import RecentGames from "./RecentGames";

import AtariLynx from "../components/brandsComponents/atari/AtariLynx";
import NintendoNES from "../components/brandsComponents/nintendo/NintendoNES";
import NintendoSNES from "../components/brandsComponents/nintendo/NintendoSNES";
import NintendoGameBoy from "../components/brandsComponents/nintendo/NintendoGB";
import NintendoGBA from "../components/brandsComponents/nintendo/NintendoGBA";
import SegaMasterSystem from "../components/brandsComponents/sega/SegaMS";
import SegaMegaDrive from "../components/brandsComponents/sega/SegaMD";
import SegaDreamcast from "../components/brandsComponents/sega/SegaDC";
import SegaGameGear from "../components/brandsComponents/sega/SegaGG";
import SonyPlaystation from "../components/brandsComponents/sony/SonyPS";
import NintendoGBC from "./brandsComponents/nintendo/NintendoGBC";

export default function Home() {
  const [activeTab, setActiveTab] = useState("home");
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleImagesLoaded = () => {
    setLoading(false);
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
          setLoading(false);
        }, 500);
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
      case "atari-lynx":
        return <AtariLynx />;
      case "nintendo-nes":
        return <NintendoNES />;
      case "nintendo-snes":
        return <NintendoSNES />;
      case "nintendo-gameboy":
        return <NintendoGameBoy />;
      case "nintendo-gbcolor":
        return <NintendoGBC />;
      case "nintendo-gba":
        return <NintendoGBA />;
      case "sega-mastersystem":
        return <SegaMasterSystem />;
      case "sega-megadrive":
        return <SegaMegaDrive />;
      case "sega-dreamcast":
        return <SegaDreamcast />;
      case "sega-gamegear":
        return <SegaGameGear />;
      case "sony-playstation":
        return <SonyPlaystation />;
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
      <div className={styles.topFlex}>
        <Header onImagesLoaded={handleImagesLoaded} />
        <NavBar activeTab={activeTab} onTabChange={setActiveTab} />
        <div className={styles.content}>{renderContent()}</div>
      </div>
      <div className={styles.bottomFlex}>
        <Footer />
      </div>
    </div>
  );
}
