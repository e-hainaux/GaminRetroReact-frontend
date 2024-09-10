import React, { useEffect, useState } from "react";
import styles from "../../../styles/brands.module.css";
import Image from "next/image";
import { fetchGamesByPlatform } from "@/utils/fetchGamesByPlatform";

export default function NintendoGB() {
  const API_URI = process.env.NEXT_PUBLIC_API_URI;
  const [resultErrorMessage, setResultErrorMessage] = useState("");
  const [gamesList, setGamesList] = useState([]);

  useEffect(() => {
    const platform = "Game Boy";

    const loadGames = async () => {
      try {
        const games = await fetchGamesByPlatform(API_URI, platform);
        setGamesList(games);
      } catch (error) {
        setResultErrorMessage(error.message);
      }
    };

    loadGames();
  }, []);

  return (
    <div className={styles.mainContainer}>
      <Image
        src="/images/nintendoLogo.png"
        alt="Logo NINTENDO"
        width={2000}
        height={755}
        quality={100}
        className={styles.brandImage}
      />
      <div className={styles.gamesFrame}>
        <Image
          src="/images/nintendoGB.png"
          alt="Logo Game Boy"
          width={1280}
          height={225}
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
                width={264}
                height={352}
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
