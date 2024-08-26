import React from "react";
import styles from "../styles/Home.module.css";

import Header from "./Header";
import NavBar from "./NavBar";
import RecentGames from "./RecentGames";

export default function Home() {
  return (
    <div className={styles.mainContainer}>
      <Header />
      <NavBar />
      <RecentGames />
    </div>
  );
}
