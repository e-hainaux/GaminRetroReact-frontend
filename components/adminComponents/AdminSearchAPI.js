import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import styles from "../../styles/AdminSearchAPI.module.css";

const AdminSearchAPI = () => {
  const API_URI = process.env.NEXT_PUBLIC_API_URI;
  const platformOptions = [
    { value: "", label: "Sélectionnez une plateforme" },
    { value: "64", label: "Master System" },
    { value: "29", label: "Mega Drive" },
    { value: "23", label: "Dreamcast" },
    { value: "35", label: "Game Gear" },
    { value: "18", label: "NES" },
    { value: "19", label: "SNES" },
    { value: "33", label: "Game Boy" },
    { value: "22", label: "GB color" },
    { value: "24", label: "GB advance" },
    { value: "7", label: "Playstation" },
    { value: "61", label: "Lynx" },
  ];
  const [platform, setPlatform] = useState("");
  const [searchRequest, setSearchRequest] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    if (!platform) {
      setErrorMessage("Veuillez sélectionner une plateforme");
      return;
    }

    if (!searchRequest.trim()) {
      setErrorMessage("Veuillez entrer un mot-clé pour la recherche");
      return;
    }

    setErrorMessage("");

    try {
      console.log("Plateforme choisie : ", platform);

      const reponse = await fetch(
        `${API_URI}/games/apisearch?title=${encodeURIComponent(
          searchRequest
        )}&platform=${platform}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!reponse.ok) {
        throw new Error("Erreur lors de la recherche");
      }
      const dataResponse = await reponse.json();

      setSearchResults(dataResponse);
    } catch (error) {
      console.error("Erreur lors de la recherche:", error);
      setErrorMessage("Une erreur est survenue lors de la recherche");
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.searchControls}>
        <select
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          className={styles.platformSelect}
        >
          {platformOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={searchRequest}
          onChange={(e) => setSearchRequest(e.target.value)}
          placeholder="Rechercher un jeu..."
          className={styles.searchInput}
        />
        <button onClick={handleSearch} className={styles.searchButton}>
          <FaSearch />
        </button>
      </div>
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
      <div className={styles.searchResults}>
        {searchResults.map((game, index) => (
          <div key={index} className={styles.gameResult}>
            <img
              src={game.image}
              alt={game.title}
              className={styles.gameImage}
            />
            <div className={styles.gameInfo}>
              <h3>{game.title}</h3>
              <p>{game.platform}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminSearchAPI;
