import React, { useEffect, useState } from "react";

import styles from "../../styles/ConnectionFrame.module.css";

export default function ConnectionFrame() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Identifiant:", identifier, "Mot de passe:", password);
  };

  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.title}>CONNEXION ADMIN</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="identifier" className={styles.label}>
            Identifiant
          </label>
          <input
            id="identifier"
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
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
        <button type="submit" className={styles.button}>
          Go !
        </button>
      </form>
    </div>
  );
}
