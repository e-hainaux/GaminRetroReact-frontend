import React, { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../../redux/slices/adminSlice";
import styles from "../../styles/ConnectionFrame.module.css";

export default function ConnectionFrame() {
  const API_URI = process.env.NEXT_PUBLIC_API_URI;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    if (!username || !password) {
      setErrorMessage("Veuillez remplir tous les champs.");
      return;
    }

    dispatch(loginStart());

    try {
      const response = await fetch(`${API_URI}/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log("Réponse du serveur : ", data);

      if (!data.result || !data.token) {
        throw new Error("Erreur lors de la connexion : ", data.message);
      }

      localStorage.setItem("adminToken", data.token);

      dispatch(loginSuccess({ token: data.token, username }));

      router.push("/admin/add-games");
    } catch (error) {
      console.error("Erreur : ", error.message);
      setErrorMessage(
        "Échec de la connexion, veuillez vérifier vos identifiants."
      );

      dispatch(loginFailure({ error: error.message }));
    } finally {
      console.log("Fin de la tentative de connexion");
    }
  };

  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.title}>CONNEXION ADMIN</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="username" className={styles.label}>
            Identifiant
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.label}>
            Mot de passe
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
        </div>
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        <button type="submit" className={styles.button}>
          Go !
        </button>
      </form>
    </div>
  );
}
