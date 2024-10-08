import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../styles/RecentGames.module.css";

export default function RecentGames() {
  const [recentGames, setRecentGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const API_URI = process.env.NEXT_PUBLIC_API_URI;

  useEffect(() => {
    console.log("useEffect déclenché");
    const fetchGames = async () => {
      console.log("Fonction fetchGames appelée");
      try {
        console.log("Lancement de la requête fetch en front.");
        console.log("API_URI : ", API_URI);

        const response = await fetch(`${API_URI}/games/recentgames`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log("Réponse reçue:", response);

        const contentType = response.headers.get("content-type");
        if (!contentType.includes("application/json")) {
          throw new Error("La réponse n'est pas en format JSON !");
        }
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des jeux");
        }
        const data = await response.json();
        setRecentGames(data);
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      } catch (error) {
        console.error(error.message);
        setIsLoading(false);
      }
    };
    fetchGames();
  }, []);

  if (isLoading) {
    return (
      <div className={styles.mainContainer}>
        <h1 className={styles.title}>Récemment ajoutés</h1>
        <div className={styles.loadingContainer}>
          <Image
            src="/images/alexKiddLoading.gif"
            alt="Chargement..."
            width={100}
            height={144}
            unoptimized
            className={styles.alexKiddGif}
          />
          <p>Chargement en cours...</p>
        </div>
      </div>
    );
  }

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
              className={styles.gameImage}
            />
            <div className={styles.gameDetails}>
              <h3 className={styles.gameTitle}>{game.title}</h3>
              <h4 className={styles.platformName}>{game.platform}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
