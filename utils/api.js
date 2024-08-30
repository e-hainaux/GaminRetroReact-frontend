export const authenticatedFetch = async (url, options = {}) => {
  const token = localStorage.getItem("adminToken");
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(url, { ...options, headers });
  if (response.status === 401) {
    localStorage.removeItem("adminToken");
  }
  return response;
};
