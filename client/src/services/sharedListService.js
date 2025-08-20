import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_BACKEND_URL,
  withCredentials: true,
});

const endpoints = {
  createList: () => "/data/playlist/create", // POST list data
  addMovie: (playlistId) => `/data/playlist/${playlistId}/add-movie`, // POST movie data
  removeMovie: (playlistId, movieId) =>
    `/data/playlist/${playlistId}/remove-movie/${movieId}`, // DELETE
  shareList: (playlistId, userId) =>
    `/data/playlist/${playlistId}/share/${userId}`, // POST
  getLists: () => "/data/playlist", // GET all lists for current user
};

//Error handler
const handleError = (error) => {
  if (error.response) {
    throw new Error(error.response.data.message || "Server error");
  } else if (error.request) {
    throw new Error("No response from server");
  } else {
    throw new Error(error.message);
  }
};

// Generic request wrapper
async function request(method, url, data = null) {
  try {
    const res = await api[method](url, data);
    return res.data;
  } catch (error) {
    handleError(error);
  }
}

// Playlist service functions
export const createList = (listData) =>
  request("post", endpoints.createList(), listData);

export const addMovie = (playlistId, movieData) =>
  request("post", endpoints.addMovie(playlistId), movieData);

export const removeMovie = (playlistId, movieId) =>
  request("delete", endpoints.removeMovie(playlistId, movieId));

export const shareList = (playlistId, userId) =>
  request("post", endpoints.shareList(playlistId, userId));

export const getLists = () => request("get", endpoints.getLists());
