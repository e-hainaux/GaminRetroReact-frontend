import React, { useState, useEffect } from "react";
import { FaSearch, FaEdit, FaTimes } from "react-icons/fa";
import styles from "../../styles/AdminUpdateBDD.module.css";

const AdminUpdateBDD = () => {
  const API_URI = process.env.NEXT_PUBLIC_API_URI;
  const [searchRequest, setSearchRequest] = useState("");
  const [games, setGames] = useState([]);
  const [modifications, setModifications] = useState({});
  const [gamesToDelete, setGamesToDelete] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [resultErrorMessage, setResultErrorMessage] = useState("");

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const response = await fetch(`${API_URI}/games/dbgames`);
      if (!response.ok)
        throw new Error("Erreur lors de la récupération des jeux");
      const data = await response.json();
      setGames(data.games);
    } catch (error) {
      console.error("Erreur lors de la récupération des jeux:", error);
      setErrorMessage(
        "Une erreur est survenue lors de la récupération des jeux"
      );
    }
  };

  const handleSearch = async () => {
    setResultErrorMessage("");

    try {
      const response = await fetch(
        `${API_URI}/games/searchdbgames?search=${encodeURIComponent(
          searchRequest
        )}`
      );
      if (!response.ok) throw new Error("Erreur lors de la recherche des jeux");
      const data = await response.json();
      setGames(data);
      if (data.length === 0)
        setResultErrorMessage("Aucun jeu correspondant trouvé.");
    } catch (error) {
      console.error("Erreur lors de la recherche des jeux:", error);
      setErrorMessage("Une erreur est survenue lors de la recherche des jeux");
    }
  };

  const handleModificationChange = (gameId, field, value) => {
    setModifications((prev) => ({
      ...prev,
      [gameId]: { ...prev[gameId], [field]: value },
    }));
  };

  const handleEditClick = (gameId) => {
    setModifications((prev) => {
      const updatedMods = { ...prev };
      if (updatedMods[gameId]) {
        delete updatedMods[gameId];
      } else {
        updatedMods[gameId] = {
          country: games.find((game) => game._id === gameId)?.country || "EU",
          complete: games.find((game) => game._id === gameId)?.complete || "",
        };
      }
      return updatedMods;
    });

    setGamesToDelete((prev) => {
      const newState = { ...prev };
      delete newState[gameId];
      return newState;
    });
  };

  const handleDeleteClick = (gameId) => {
    setGamesToDelete((prev) => {
      const newState = { ...prev };
      if (newState[gameId]) {
        delete newState[gameId];
        // Cancel any ongoing modifications
        setModifications((prevMods) => {
          const updatedMods = { ...prevMods };
          delete updatedMods[gameId];
          return updatedMods;
        });
      } else {
        newState[gameId] = true;
      }
      return newState;
    });
  };

  const handleSubmit = async () => {
    const gamesToUpdate = Object.keys(modifications)
      .filter((id) => !gamesToDelete[id])
      .map((id) => {
        const { complete, country } = modifications[id];
        // Ensure `complete` is selected
        if (!complete) {
          throw new Error(
            `Veuillez sélectionner une complétion pour le jeu ${id}`
          );
        }
        return {
          id,
          complete,
          country,
        };
      });

    const gameIdsToDelete = Object.keys(gamesToDelete);

    try {
      if (gamesToUpdate.length > 0) {
        const responseUpdate = await fetch(`${API_URI}/games/updategames`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ gamesToUpdate }),
        });
        if (!responseUpdate.ok)
          throw new Error("Erreur lors de la mise à jour des jeux");
      }

      if (gameIdsToDelete.length > 0) {
        const responseDelete = await fetch(`${API_URI}/games/deletegames`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ gameIds: gameIdsToDelete }),
        });
        if (!responseDelete.ok)
          throw new Error("Erreur lors de la suppression des jeux");
      }

      await fetchGames();
      setModifications({});
      setGamesToDelete({});
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour ou de la suppression des jeux:",
        error
      );
      setErrorMessage(
        "Une erreur est survenue lors de la mise à jour ou de la suppression des jeux"
      );
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.searchControls}>
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
        <div className={styles.title}>Résultats de la recherche</div>
        {resultErrorMessage && (
          <p className={styles.errorMessage}>{resultErrorMessage}</p>
        )}
        {games.map((game) => (
          <div key={game._id} className={styles.gameCard}>
            <h3 className={styles.gameTitleSmallScreens}>{game.title}</h3>
            <div className={styles.gameResult}>
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

                <div className={styles.blocks}>
                  <div className={styles.gameBlockOne}>
                    <p className={styles.gamePlatformNameSmallScreens}>
                      {game.platform}
                    </p>
                  </div>
                  <div className={styles.gameBlockTwo}>
                    <div className={styles.selectContainer}>
                      <select
                        id={`country-${game._id}`}
                        value={modifications[game._id]?.country || game.country}
                        onChange={(e) =>
                          handleModificationChange(
                            game._id,
                            "country",
                            e.target.value
                          )
                        }
                        className={styles.selectField}
                        disabled={!modifications[game._id]}
                      >
                        <option value="EU">EU</option>
                        <option value="US">US</option>
                        <option value="JP">JP</option>
                      </select>
                    </div>
                    <div className={styles.radioGroup}>
                      <label>
                        <input
                          type="radio"
                          name={`complete-${game._id}`}
                          value="complet"
                          checked={
                            modifications[game._id]?.complete === "complet" ||
                            (!modifications[game._id] &&
                              game.complete === "complet")
                          }
                          onChange={() =>
                            handleModificationChange(
                              game._id,
                              "complete",
                              "complet"
                            )
                          }
                          className={styles.radioInput}
                          disabled={!modifications[game._id]}
                        />
                        Complet
                      </label>
                      <label>
                        <input
                          type="radio"
                          name={`complete-${game._id}`}
                          value="boîte"
                          checked={
                            modifications[game._id]?.complete === "boîte" ||
                            (!modifications[game._id] &&
                              game.complete === "boîte")
                          }
                          onChange={() =>
                            handleModificationChange(
                              game._id,
                              "complete",
                              "boîte"
                            )
                          }
                          className={styles.radioInput}
                          disabled={!modifications[game._id]}
                        />
                        Boîte
                      </label>
                      <label>
                        <input
                          type="radio"
                          name={`complete-${game._id}`}
                          value="cartouche"
                          checked={
                            modifications[game._id]?.complete === "cartouche" ||
                            (!modifications[game._id] &&
                              game.complete === "cartouche")
                          }
                          onChange={() =>
                            handleModificationChange(
                              game._id,
                              "complete",
                              "cartouche"
                            )
                          }
                          className={styles.radioInput}
                          disabled={!modifications[game._id]}
                        />
                        Cartouche
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.gameElements}>
                <button
                  id={`edit-button-${game._id}`}
                  className={`${styles.editButton} ${
                    modifications[game._id] ? styles.active : ""
                  }`}
                  onClick={() => handleEditClick(game._id)}
                >
                  <FaEdit />
                </button>
                <button
                  id={`delete-button-${game._id}`}
                  className={`${styles.deleteButton} ${
                    gamesToDelete[game._id] ? styles.selected : ""
                  }`}
                  onClick={() => handleDeleteClick(game._id)}
                  disabled={!!modifications[game._id]}
                >
                  <FaTimes />
                </button>
              </div>
            </div>
            <div className={styles.separation}></div>
          </div>
        ))}
      </div>
      <div className={styles.finalButtonContainer}>
        <button className={styles.finalSubmitButton} onClick={handleSubmit}>
          Appliquer les modifications
        </button>
      </div>
    </div>
  );
};

export default AdminUpdateBDD;
