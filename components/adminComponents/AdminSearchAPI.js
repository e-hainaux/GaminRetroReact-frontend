import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import styles from "../../styles/AdminSearchAPI.module.css";

const optionsPlateformes = [
  { value: "", label: "Sélectionnez une plateforme" },
  { value: "Master System", label: "Master System" },
  { value: "Mega Drive", label: "Mega Drive" },
  { value: "Dreamcast", label: "Dreamcast" },
  { value: "Game Gear", label: "Game Gear" },
  { value: "NES", label: "NES" },
  { value: "SNES", label: "SNES" },
  { value: "Game Boy", label: "Game Boy" },
  { value: "GB color", label: "Game Boy Color" },
  { value: "GB advance", label: "Game Boy Advance" },
  { value: "Playstation", label: "PlayStation" },
  { value: "Lynx", label: "Lynx" },
];

const AdminSearchAPI = () => {
  const [plateforme, setPlateforme] = useState("");
  const [requeteRecherche, setRequeteRecherche] = useState("");
  const [messageErreur, setMessageErreur] = useState("");
  const [resultatsRecherche, setResultatsRecherche] = useState([]);

  const handleRecherche = async () => {
    if (!plateforme) {
      setMessageErreur("Veuillez sélectionner une plateforme");
      return;
    }

    if (!requeteRecherche.trim()) {
      setMessageErreur("Veuillez entrer un mot-clé pour la recherche");
      return;
    }

    setMessageErreur("");

    try {
      const reponse = await fetch(
        `/api/games/apisearch?title=${encodeURIComponent(
          requeteRecherche
        )}&platform=${encodeURIComponent(plateforme)}`
      );
      if (!reponse.ok) {
        throw new Error("Erreur lors de la recherche");
      }
      const donnees = await reponse.json();
      setResultatsRecherche(donnees);
    } catch (erreur) {
      console.error("Erreur lors de la recherche:", erreur);
      setMessageErreur("Une erreur est survenue lors de la recherche");
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.searchControl}>
        <select
          value={plateforme}
          onChange={(e) => setPlateforme(e.target.value)}
          className="select-plateforme"
        >
          {optionsPlateformes.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={requeteRecherche}
          onChange={(e) => setRequeteRecherche(e.target.value)}
          placeholder="Rechercher un jeu..."
          className="input-recherche"
        />
        <button onClick={handleRecherche} className="bouton-recherche">
          <FaSearch />
        </button>
      </div>
      {messageErreur && <p className="message-erreur">{messageErreur}</p>}
      <div className="resultats-recherche">
        {resultatsRecherche.map((jeu, index) => (
          <div key={index} className="resultat-jeu">
            <img src={jeu.image} alt={jeu.title} className="image-jeu" />
            <div className="info-jeu">
              <h3>{jeu.title}</h3>
              <p>{jeu.platform}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminSearchAPI;
