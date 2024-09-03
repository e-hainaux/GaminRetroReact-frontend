import React, { useState, useEffect } from "react";
import { FaSearch, FaEdit, FaTimes } from "react-icons/fa";
import styles from "../../styles/AdminUpdateBDD.module.css"; // Assurez-vous d'adapter le chemin à votre structure de dossier

const AdminUpdateGames = () => {
  const API_URI = process.env.NEXT_PUBLIC_API_URI;
  const [searchRequest, setSearchRequest] = useState("");
  const [games, setGames] = useState([]);
  const [modifications, setModifications] = useState({});
  const [gamesToDelete, setGamesToDelete] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [resultErrorMessage, setResultErrorMessage] = useState("");

  // Fonction pour récupérer les jeux depuis la BDD
  const fetchGames = async () => {
    try {
      const response = await fetch(`${API_URI}/games/dbgames`);
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des jeux");
      }
      const data = await response.json();
      setGames(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des jeux:", error);
      setErrorMessage(
        "Une erreur est survenue lors de la récupération des jeux"
      );
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  // Fonction pour rechercher les jeux par mot-clé
  const handleSearch = async () => {
    try {
      const response = await fetch(
        `${API_URI}/games/searchdbgames?search=${encodeURIComponent(
          searchRequest
        )}`
      );
      if (!response.ok) {
        throw new Error("Erreur lors de la recherche des jeux");
      }
      const data = await response.json();
      setGames(data);
      if (data.length === 0) {
        setResultErrorMessage("Aucun jeu correspondant trouvé.");
      }
    } catch (error) {
      console.error("Erreur lors de la recherche des jeux:", error);
      setErrorMessage("Une erreur est survenue lors de la recherche des jeux");
    }
  };

  // Fonction pour activer/désactiver le mode de modification d'un jeu
  const handleEditClick = (gameId) => {
    setModifications((prev) => ({
      ...prev,
      [gameId]: { ...prev[gameId], isEditing: !prev[gameId]?.isEditing },
    }));
  };

  // Fonction pour gérer les changements dans les champs de modification
  const handleModificationChange = (gameId, field, value) => {
    setModifications((prev) => ({
      ...prev,
      [gameId]: { ...prev[gameId], [field]: value },
    }));
  };

  // Fonction pour activer/désactiver la suppression d'un jeu
  const handleDeleteClick = (gameId) => {
    setGamesToDelete((prev) => {
      const newState = { ...prev };
      if (newState[gameId]) {
        delete newState[gameId];
        // Supprimer les modifications si le jeu est marqué pour suppression
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

  // Fonction pour valider les modifications et suppressions
  const handleSubmit = async () => {
    const gamesToUpdate = Object.keys(modifications).map((id) => ({
      id,
      complete: modifications[id]?.complete,
      country: modifications[id]?.country,
    }));

    const gameIdsToDelete = Object.keys(gamesToDelete);

    try {
      // Mettre à jour les jeux
      if (gamesToUpdate.length > 0) {
        const responseUpdate = await fetch(`${API_URI}/games/updategames`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ gamesToUpdate }),
        });
        if (!responseUpdate.ok) {
          throw new Error("Erreur lors de la mise à jour des jeux");
        }
      }

      // Supprimer les jeux
      if (gameIdsToDelete.length > 0) {
        const responseDelete = await fetch(`${API_URI}/games/deletegames`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ gameIds: gameIdsToDelete }),
        });
        if (!responseDelete.ok) {
          throw new Error("Erreur lors de la suppression des jeux");
        }
      }

      // Réactualiser la liste des jeux après les modifications
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
            <div className={styles.gameResult}>
              <img
                src={game.image}
                alt={game.title}
                className={styles.gameImage}
              />
              <div className={styles.gameInfo}>
                <h3 className={styles.gameTitle}>{game.title}</h3>
                <p className={styles.gamePlatformName}>{game.platform}</p>
                {modifications[game._id]?.isEditing && (
                  <div className={styles.modificationFields}>
                    <input
                      type="text"
                      value={modifications[game._id]?.complete || game.complete}
                      onChange={(e) =>
                        handleModificationChange(
                          game._id,
                          "complete",
                          e.target.value
                        )
                      }
                      placeholder="Complétion"
                      className={styles.inputField}
                    />
                    <input
                      type="text"
                      value={modifications[game._id]?.country || game.country}
                      onChange={(e) =>
                        handleModificationChange(
                          game._id,
                          "country",
                          e.target.value
                        )
                      }
                      placeholder="Pays"
                      className={styles.inputField}
                    />
                  </div>
                )}
              </div>
              <div className={styles.gameElements}>
                <button
                  className={`${styles.radioButton} ${
                    modifications[game._id]?.isEditing ? styles.selected : ""
                  }`}
                  onClick={() => handleEditClick(game._id)}
                  disabled={gamesToDelete[game._id]}
                >
                  <FaEdit />
                </button>
                <button
                  className={`${styles.radioButton} ${
                    gamesToDelete[game._id] ? styles.selected : ""
                  }`}
                  onClick={() => handleDeleteClick(game._id)}
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

export default AdminUpdateGames;
