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
  const [isSearchActive, setIsSearchActive] = useState(false);
  const API_URI = process.env.NEXT_PUBLIC_API_URI;
  const gamesListRef = useRef(null);

  useEffect(() => {
    if (onClose) {
      setLimit(10);
      setOffset(0);
      setGames([]);
      setHasMoreGames(true);
      setIsSearchActive(false);
    }
  }, [onClose]);

  const fetchGames = async () => {
    if (hasMoreGames && !isSearchActive) {
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
          setGames(newGames);
        } else {
          setGames((prevGames) => [...prevGames, ...newGames]);
        }

        setTotalGames(totalCount);
        setIsLoading(false);
        setHasMoreGames(offset + limit < totalCount);
      } catch (error) {
        console.error("Erreur lors de la récupération des jeux", error);
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchGames();
  }, [offset, hasMoreGames]);

  const handleSearch = async () => {
    if (!searchTerm) return;

    setIsLoading(true);
    setIsSearchActive(true);
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

      setGames(searchedGames);
      setOffset(0);
      setHasMoreGames(false);
      setIsLoading(false);

      if (gamesListRef.current) {
        gamesListRef.current.scrollTop = 0;
      }
    } catch (error) {
      console.error("Erreur lors de la recherche", error);
      setIsLoading(false);
    }
  };

  const loadMoreGames = () => {
    if (!isSearchActive) {
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
            Ok
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
                    width={128}
                    height={171}
                    quality={100}
                    className={styles.gameImage}
                  />
                  <div className={styles.gameInfo}>
                    <h3 className={styles.gameTitle}>{game.title}</h3>
                    <h4 className={styles.platformName}>{game.platform}</h4>
                    <h4 className={styles.complete}>{game.complete}</h4>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {!isSearchActive && hasMoreGames && (
          <button className={styles.loadMoreButton} onClick={loadMoreGames}>
            +
          </button>
        )}
      </div>
    </div>
  );
}
