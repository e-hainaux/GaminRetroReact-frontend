import React, { useEffect, useState } from "react";
import styles from "../../../styles/brands.module.css";
import Image from "next/image";
import fetch from "node-fetch";

export default function Atari() {
  const API_URI = process.env.NEXT_PUBLIC_API_URI;
  const [resultErrorMessage, setResultErrorMessage] = useState("");
  const [gamesList, setGamesList] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch(
          `${API_URI}/games/searchdbgamesbyplatform`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Longueur réponse reçue:", response.length);
        if (response.length === 0) {
          setResultErrorMessage("Aucun jeu trouvé");
          return;
        }

        const contentType = response.headers.get("content-type");
        if (!contentType.includes("application/json")) {
          throw new Error("La réponse n'est pas au format JSON !");
        }
        if (!response.ok) {
          throw new error("Erreur lors de la récupération des jeux");
        }
        const dataResponse = await response.json();

        const gamesOnPlatform = dataResponse.map((game) => ({
          ...game,
        }));
        if (gamesOnPlatform.length === 0) {
          setResultErrorMessage("Aucun jeu correspondant trouvé.");
        }

        setGamesList(dataResponse);
      } catch (error) {}
    };
    fetchGames();
  }, []);

  return (
    <div className={styles.mainContainer}>
      <Image
        src="/images/atariLogo.png"
        alt="Logo ATARI"
        width={100}
        height={100}
        quality={100}
        className={styles.brandImage}
      />
      <div className={styles.gamesFrame}>
        <Image
          src="/images/atariLynx.png"
          alt="Logo LYNX"
          width={100}
          height={100}
          quality={100}
          className={styles.platformImage}
        />
        <div className={styles.gamesList}>
          {resultErrorMessage && (
            <p className={styles.errorMessage}>{resultErrorMessage}</p>
          )}
          {gamesList.map((game) => (
            <div key={game._id} className={styles.gameCard}>
              <Image
                src={game.image}
                alt={game.title}
                width={100}
                height={100}
                className={styles.gameImage}
              />
              <div className={styles.gameInfo}>
                <h3 className={styles.gameTitle}>{game.title}</h3>
                <h4 className={styles.gameDetails}>
                  {game.country} - {game.complete}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
