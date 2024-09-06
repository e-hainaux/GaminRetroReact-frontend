export const fetchGamesByPlatform = async (API_URI, platform) => {
  try {
    const response = await fetch(
      `${API_URI}/games/searchdbgamesbyplatform?platform=${encodeURIComponent(
        platform
      )}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 404 || response.status === 500) {
      throw new Error("Erreur lors de la récupération des jeux.");
    }

    const dataResponse = await response.json();

    if (dataResponse.length === 0) {
      throw new Error("Aucun jeu trouvé pour cette plateforme.");
    }

    return dataResponse;
  } catch (error) {
    throw error;
  }
};
