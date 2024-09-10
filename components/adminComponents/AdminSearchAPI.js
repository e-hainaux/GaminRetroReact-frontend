import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
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
    setResultErrorMessage("");

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
      const response = await fetch(
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
      if (!response.ok) {
        throw new Error("Erreur lors de la recherche");
      }
      const dataResponse = await response.json();
      console.log("Search results:", dataResponse);

      const gamesWithId = dataResponse.map((game) => ({
        ...game,
        tempId: uuidv4(),
      }));

      setSearchResults(gamesWithId);
      if (gamesWithId.length === 0) {
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

  const handleOptionChange = (tempId, option) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [tempId]: option,
    }));
  };

  const handleCountryChange = (tempId, country) => {
    setSelectedCountries((prev) => ({
      ...prev,
      [tempId]: country,
    }));
  };

  const handleAddGameToList = (tempId, game, selectedOption) => {
    console.log(
      "Button clicked for game with tempId:",
      tempId,
      "game : ",
      game,
      "complete : ",
      selectedOption
    );
    if (successfulButtons[tempId]) return; // Empêche le clic si le bouton est marqué comme "successful"

    const isActive = activeButtons[tempId];

    if (isActive) {
      setGamesToAdd((prevGames) =>
        prevGames.filter((g) => g.tempId !== tempId)
      );
    } else {
      const gameToAdd = {
        ...game,
        complete: selectedOption || "complet",
        country: selectedCountries[tempId] || "EU",
      };
      setGamesToAdd((prevGames) => [...prevGames, gameToAdd]);
    }

    setActiveButtons((prev) => ({
      ...prev,
      [tempId]: !isActive,
    }));
    console.log("Updated activeButtons state:", activeButtons);
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
      console.log("Server response : ", result.message);

      const newSuccessfulButtons = {};
      gamesToAdd.forEach((game) => {
        const index = searchResults.findIndex((g) => g.tempId === game.tempId);
        console.log("Game temp ID:", game.tempId, "found at index:", index);
        newSuccessfulButtons[searchResults[index].tempId] = true;
      });
      console.log("New successfulButtons state:", newSuccessfulButtons);
      setSuccessfulButtons((prev) => ({ ...prev, ...newSuccessfulButtons }));

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
        <div className={styles.searchBarContainer}>
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
      </div>
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
      <div className={styles.searchResults}>
        <div className={styles.title}>Résultat</div>
        {resultErrorMessage && (
          <p className={styles.errorMessage}>{resultErrorMessage}</p>
        )}
        {searchResults.map((game) => (
          <div key={game.tempId} className={styles.gameCard}>
            <div className={styles.gameResult}>
              <div className={styles.gameBlockOne}>
                <img
                  src={game.image}
                  alt={game.title}
                  className={styles.gameImage}
                />
                <div className={styles.gameInfo}>
                  <div className={styles.gameDetails}>
                    <h3 className={styles.gameTitle}>{game.title}</h3>
                    <p className={styles.gamePlatformName}>{game.platform}</p>
                  </div>
                  <select
                    value={selectedCountries[game.tempId] || "EU"}
                    onChange={(e) =>
                      handleCountryChange(game.tempId, e.target.value)
                    }
                    className={styles.countrySelect}
                  >
                    {countryOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className={styles.gameBlockTwo}>
                <div className={styles.gameElements}>
                  <button
                    className={`${styles.radioButton} ${
                      selectedOptions[game.tempId] === "complet"
                        ? styles.selected
                        : ""
                    }`}
                    onClick={() => handleOptionChange(game.tempId, "complet")}
                  >
                    Complet
                  </button>
                  <button
                    className={`${styles.radioButton} ${
                      selectedOptions[game.tempId] === "boite"
                        ? styles.selected
                        : ""
                    }`}
                    onClick={() => handleOptionChange(game.tempId, "boite")}
                  >
                    Boîte
                  </button>
                  <button
                    className={`${styles.radioButton} ${
                      selectedOptions[game.tempId] === "cartouche"
                        ? styles.selected
                        : ""
                    }`}
                    onClick={() => handleOptionChange(game.tempId, "cartouche")}
                  >
                    Cartouche
                  </button>
                </div>
                <div className={styles.buttonContainer}>
                  <button
                    className={`${styles.addGameButton} ${
                      activeButtons[game.tempId] ? styles.rotated : ""
                    } ${
                      successfulButtons[game.tempId] ? styles.successful : ""
                    }`}
                    onClick={() =>
                      handleAddGameToList(
                        game.tempId,
                        game,
                        selectedOptions[game.tempId]
                      )
                    }
                    disabled={
                      !selectedOptions[game.tempId] ||
                      successfulButtons[game.tempId]
                    }
                  >
                    {successfulButtons[game.tempId] ? "✓" : "+"}
                  </button>
                </div>
              </div>
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
