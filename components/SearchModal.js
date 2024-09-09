import React, { useState, useEffect, useRef } from "react";
import styles from "../styles/SearchModal.module.css";
import Image from "next/image";

export default function SearchModal({ onClose }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [hasMoreGames, setHasMoreGames] = useState(true);
  const [totalGames, setTotalGames] = useState(0);
  const [isSearchActive, setIsSearchActive] = useState(false); // Nouveau flag pour gérer le mode recherche
  const API_URI = process.env.NEXT_PUBLIC_API_URI;
  const gamesListRef = useRef(null);

  // Réinitialisation lors de la fermeture de la modal
  useEffect(() => {
    if (onClose) {
      setLimit(10);
      setOffset(0);
      setGames([]);
      setHasMoreGames(true);
      setIsSearchActive(false); // Reset du flag de recherche
    }
  }, [onClose]);

  // Fonction pour charger les jeux avec pagination
  const fetchGames = async () => {
    if (hasMoreGames && !isSearchActive) {
      // Ne charger que si la recherche n'est pas active
      setIsLoading(true);
      try {
        const response = await fetch(
          `${API_URI}/games/dbgames?limit=${limit}&offset=${offset}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const { games: newGames, totalCount } = await response.json();

        if (offset === 0) {
          setGames(newGames); // Premier chargement
        } else {
          setGames((prevGames) => [...prevGames, ...newGames]); // Ajout des nouveaux jeux
        }

        setTotalGames(totalCount);
        setIsLoading(false);
        setHasMoreGames(offset + limit < totalCount); // Vérifier si tous les jeux ont été récupérés
      } catch (error) {
        console.error("Erreur lors de la récupération des jeux", error);
        setIsLoading(false);
      }
    }
  };

  // Premier appel de la fonction fetchGames au montage du composant
  useEffect(() => {
    fetchGames(); // Charger les jeux au premier rendu
  }, [offset, hasMoreGames]); // Appel de fetchGames lorsque l'offset ou hasMoreGames change

  // Fonction pour gérer la recherche
  const handleSearch = async () => {
    if (!searchTerm) return; // Si le champ de recherche est vide, ne pas lancer la recherche

    setIsLoading(true);
    setIsSearchActive(true); // Activer le mode recherche
    try {
      const response = await fetch(
        `${API_URI}/games/searchdbgames?search=${searchTerm}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const searchedGames = await response.json();
      console.log("searchedGames : ", searchedGames);

      setGames(searchedGames); // Mettre à jour la liste des jeux
      setOffset(0); // Réinitialiser l'offset
      setHasMoreGames(false); // Désactiver le bouton "Charger plus" après une recherche
      setIsLoading(false);
      // Réinitialiser la position du scroll à zéro
      if (gamesListRef.current) {
        gamesListRef.current.scrollTop = 0; // Revenir tout en haut de la liste
      }
    } catch (error) {
      console.error("Erreur lors de la recherche", error);
      setIsLoading(false);
    }
  };

  const loadMoreGames = () => {
    if (!isSearchActive) {
      // Charger plus de jeux seulement si ce n'est pas une recherche
      setOffset((prevOffset) => prevOffset + limit);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.modalContent}>
        <div className={styles.closeButtonContainer}>
          <button className={styles.closeButton} onClick={onClose}>
            X
          </button>
        </div>
        <div className={styles.searchBarContainer}>
          <input
            type="text"
            className={styles.searchBar}
            placeholder="Rechercher un jeu"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className={styles.searchButton} onClick={handleSearch}>
            Rechercher
          </button>
        </div>
        <div className={styles.gamesListContainer}>
          {isLoading && games.length === 0 ? (
            <p>Chargement...</p>
          ) : (
            <div className={styles.gamesList} ref={gamesListRef}>
              {games.map((game) => (
                <div key={game._id} className={styles.gameCard}>
                  <Image
                    src={game.image}
                    alt={game.title}
                    width={100}
                    height={100}
                    className={styles.gameImage}
                  />
                  <h3 className={styles.gameTitle}>{game.title}</h3>
                  <h4 className={styles.platformName}>{game.platform}</h4>
                </div>
              ))}
            </div>
          )}
        </div>
        {!isSearchActive &&
          hasMoreGames && ( // N'afficher le bouton que si la recherche n'est pas active
            <button className={styles.loadMoreButton} onClick={loadMoreGames}>
              +
            </button>
          )}
      </div>
    </div>
  );
}
