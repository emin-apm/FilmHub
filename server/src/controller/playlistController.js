import { Router } from "express";
import * as playlistService from "../services/playlistService.js";

const router = Router();

//create playlist
router.post("/create", async (req, res) => {
  try {
    const userId = req.user._id;
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Playlist name is required" });
    }

    const playlist = await playlistService.createPlaylist(userId, name.trim());

    res.status(201).json(playlist);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add movie to playlist
router.post("/:playlistId/add-movie", async (req, res) => {
  try {
    const userId = req.user._id;
    const { playlistId } = req.params;

    // { movie data}
    const movie = req.body;

    if (!movie || !movie.id || !movie.name) {
      return res.status(400).json({ message: "Movie data is required!" });
    }

    const updatePlaylist = await playlistService.addMovieToPlaylist(
      playlistId,
      userId,
      movie
    );
    res.status(200).json({ playlist: updatePlaylist });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:playlistId/movies/:movieId", async (req, res) => {
  try {
    const user = req.user._id;
    const { playlistId, movieId } = req.params;

    // const updatePlaylist = await playlistService.removeMovieFromPlaylis(
    //   playlistId,
    //   userId,
    //   movieId
    // );

    // res.status(200).json(playlist:updatePlaylist)
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/:playlistId/share/:userId", async (req, res) => {
  try {
    const currentUserId = req.user._id;
    const { playlistId, userId } = req.params;

    const updatePlaylist = await playlistService.sharePlaylistWithUser(
      playlistId,
      currentUserId,
      userId
    );

    res.status(200).json({ playlist: updatePlaylist });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
