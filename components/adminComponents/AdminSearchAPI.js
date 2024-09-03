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

  const countryOptions = [
    { value: "EU", label: "EU" },
    { value: "US", label: "US" },
    { value: "JP", label: "JP" },
  ];

  const [platform, setPlatform] = useState("");
  const [searchRequest, setSearchRequest] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [resultErrorMessage, setResultErrorMessage] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [selectedCountries, setSelectedCountries] = useState({});
  const [gamesToAdd, setGamesToAdd] = useState([]);
  const [activeButtons, setActiveButtons] = useState({});
  const [successfulButtons, setSuccessfulButtons] = useState({});

  const handleSearch = async () => {
    if (!platform) {
      setErrorMessage("Veuillez sélectionner une plateforme");
      return;
    }

    if (!searchRequest.trim()) {
      setErrorMessage("Veuillez entrer un mot-clé pour la recherche");
      return;
    }

    resetButtonStates();

    setErrorMessage("");

    try {
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
      if (dataResponse.length === 0) {
        setResultErrorMessage("Aucun jeu correspondant trouvé.");
      }
    } catch (error) {
      console.error("Erreur lors de la recherche:", error);
      setErrorMessage("Une erreur est survenue lors de la recherche");
    }
  };

  const resetButtonStates = () => {
    setActiveButtons({});
    setSelectedOptions({});
    setSelectedCountries({});
    setSuccessfulButtons({});
  };

  const handleOptionChange = (index, option) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [index]: option,
    }));
  };

  const handleCountryChange = (index, country) => {
    setSelectedCountries((prev) => ({
      ...prev,
      [index]: country,
    }));
  };

  const handleAddGameToList = (index, game, selectedOption) => {
    if (successfulButtons[index]) return; // Empêche le clic si le bouton est marqué comme "successful"

    const isActive = activeButtons[index];

    if (isActive) {
      setGamesToAdd((prevGames) => prevGames.filter((g) => g.id !== game.id));
    } else {
      const gameToAdd = {
        ...game,
        condition: selectedOption || "complet",
        country: selectedCountries[index] || "EU",
      };
      setGamesToAdd((prevGames) => [...prevGames, gameToAdd]);
    }

    // Mise à jour de l'état pour le bouton
    setActiveButtons((prev) => ({
      ...prev,
      [index]: !isActive,
    }));
  };

  const handleSubmit = async () => {
    if (gamesToAdd.length === 0) {
      setErrorMessage("Aucun jeu à ajouter. Veuillez sélectionner des jeux.");
      return;
    }

    setErrorMessage("");

    try {
      const response = await fetch(`${API_URI}/games/addgames`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ gamesToAdd }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout des jeux");
      }

      const result = await response.json();
      console.log(result.message);

      // Marquer les boutons comme réussis
      const newSuccessfulButtons = {};
      gamesToAdd.forEach((game) => {
        const index = searchResults.findIndex((g) => g.id === game.id);
        newSuccessfulButtons[index] = true;
      });
      setSuccessfulButtons((prev) => ({ ...prev, ...newSuccessfulButtons }));

      // Réinitialiser les états sauf successfulButtons
      setActiveButtons({});
      setSelectedOptions({});
      setSelectedCountries({});
      setGamesToAdd([]);
    } catch (error) {
      console.error("Erreur lors de l'ajout des jeux:", error);
      setErrorMessage("Une erreur est survenue lors de l'ajout des jeux");
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
        <div className={styles.title}>Résultat</div>
        {resultErrorMessage && (
          <p className={styles.errorMessage}>{resultErrorMessage}</p>
        )}
        {searchResults.map((game, index) => (
          <div key={index} className={styles.gameCard}>
            <div className={styles.gameResult}>
              <img
                src={game.image}
                alt={game.title}
                className={styles.gameImage}
              />
              <div className={styles.gameInfo}>
                <h3 className={styles.gameTitle}>{game.title}</h3>
                <p className={styles.gamePlatformName}>{game.platform}</p>
                <select
                  value={selectedCountries[index] || "EU"}
                  onChange={(e) => handleCountryChange(index, e.target.value)}
                  className={styles.countrySelect}
                >
                  {countryOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.gameElements}>
                <button
                  className={`${styles.radioButton} ${
                    selectedOptions[index] === "complet" ? styles.selected : ""
                  }`}
                  onClick={() => handleOptionChange(index, "complet")}
                >
                  Complet
                </button>
                <button
                  className={`${styles.radioButton} ${
                    selectedOptions[index] === "boite" ? styles.selected : ""
                  }`}
                  onClick={() => handleOptionChange(index, "boite")}
                >
                  Boîte
                </button>
                <button
                  className={`${styles.radioButton} ${
                    selectedOptions[index] === "cartouche"
                      ? styles.selected
                      : ""
                  }`}
                  onClick={() => handleOptionChange(index, "cartouche")}
                >
                  Cartouche
                </button>
              </div>
              <button
                className={`${styles.addGameButton} ${
                  activeButtons[index] ? styles.rotated : ""
                } ${successfulButtons[index] ? styles.successful : ""}`}
                onClick={() =>
                  handleAddGameToList(index, game, selectedOptions[index])
                }
                disabled={!selectedOptions[index] || successfulButtons[index]}
              >
                {successfulButtons[index] ? "✓" : "+"}
              </button>
            </div>

            <div className={styles.separation}></div>
          </div>
        ))}
      </div>
      <div className={styles.finalButtonContainer}>
        <button className={styles.finalSubmitButton} onClick={handleSubmit}>
          Envoyer à la base de données
        </button>
      </div>
    </div>
  );
};

export default AdminSearchAPI;
