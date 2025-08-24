import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_BACKEND_URL,
  withCredentials: true,
});

const endpoints = {
  addMovie: (userId) => `/data/userPlaylist/${userId}/movies`,
  removeMovie: (userId, movieId) =>
    `/data/userPlaylist/${userId}/movies/${movieId}`,
};

const handleError = (error) => {
  if (error.response) {
    throw new Error(error.response.data.message || "Server error");
  } else if (error.request) {
    throw new Error("No response from server");
  } else {
    throw new Error(error.message);
  }
};

async function request(method, url, data = null) {
  try {
    const res = await api[method](url, data);
    return res.data;
  } catch (error) {
    handleError(error);
  }
}

// Add a movie for a user
export const addMovie = (userId, movieData) => {
  return request("post", endpoints.addMovie(userId), movieData);
};

// Remove a movie for a user
export const removeMovie = (userId, movieId) => {
  return request("delete", endpoints.removeMovie(userId, movieId));
};
