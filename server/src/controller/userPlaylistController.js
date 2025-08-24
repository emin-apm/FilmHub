import { Router } from "express";
import * as userPlaylistService from "../services/userPlaylistService.js";

const router = Router();

router.post("/:userId/movies", async (req, res) => {
  try {
    const { userId } = req.params;
    const movieData = req.body;

    if (!movieData || !movieData.id) {
      return res.status(400).json({ message: "Movie data is required" });
    }

    const playlists = await userPlaylistService.addUserMovie(movieData, userId);

    res.status(200).json(playlists);
  } catch (error) {
    console.error("Error adding movie:", error);
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:userId/movies/:movieId", async (req, res) => {
  try {
    const { userId, movieId } = req.params;

    const movies = await userPlaylistService.removeUserMovie(movieId, userId);

    res.status(200).json(movies);
  } catch (error) {
    console.error("Error removing movie:", error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
