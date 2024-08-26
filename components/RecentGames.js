import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../styles/RecentGames.module.css";

export default function RecentGames() {
  const [recentGames, setRecentGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch(
          "https://gamin-retro-react-backend.vercel.app/games/recentgames"
        );
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des jeux");
        }
        const data = await response.json();
        setRecentGames(data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchGames();
  }, []);

  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.title}>Récemment ajoutés</h1>
      <div className={styles.gamesContainer}>
        {recentGames.map((game) => (
          <div key={game._id} className={styles.gameCard}>
            <Image
              src={game.image}
              alt={game.title}
              width={100}
              height={100}
              layout="responsive"
            />
            <h3 className={styles.gameTitle}>{game.title}</h3>
            <h4 className={styles.platformName}>{game.platform}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}
