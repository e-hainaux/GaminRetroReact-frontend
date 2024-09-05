import React, { useState } from "react";
import styles from "../styles/Home.module.css";

import Header from "./Header";
import NavBar from "./NavBar";
import RecentGames from "./RecentGames";
import Atari from "../components/brandsComponents/atari/Atari";
import Nintendo from "../components/brandsComponents/nintendo/nintendo";
import Sega from "../components/brandsComponents/sega/sega";
import Sony from "../components/brandsComponents/sony/sony";

export default function Home() {
  const [activeTab, setActiveTab] = useState("home");

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

  return (
    <div className={styles.mainContainer}>
      <Header />
      <NavBar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className={styles.content}>{renderContent()}</div>
    </div>
  );
}
