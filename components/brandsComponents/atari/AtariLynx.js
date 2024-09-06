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
        const platform = "Lynx"; // Tu peux changer cette valeur pour une autre plateforme
        const response = await fetch(
          `${API_URI}/games/searchdbgamesbyplatform?platform=${platform}`, // Ajout du paramètre
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 404 || response.status === 500) {
          setResultErrorMessage("Erreur lors de la récupération des jeux.");
          return;
        }

        const dataResponse = await response.json();
        if (dataResponse.length === 0) {
          setResultErrorMessage("Aucun jeu trouvé pour cette plateforme.");
          return;
        }

        setGamesList(dataResponse);
      } catch (error) {
        setResultErrorMessage("Une erreur est survenue.");
      }
    };

    fetchGames();
  }, []);

  return (
    <div className={styles.mainContainer}>
      <Image
        src="/images/atariLogo.png"
        alt="Logo ATARI"
        width={2560}
        height={683}
        quality={100}
        className={styles.brandImage}
      />
      <div className={styles.gamesFrame}>
        <Image
          src="/images/atariLynx.png"
          alt="Logo LYNX"
          width={2560}
          height={287}
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
