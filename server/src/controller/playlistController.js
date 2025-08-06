import { Router } from "express";
import * as playlistService from "../services/playlistService.js";

const router = Router();

router.post("/create", async (req, res) => {
  try {
    const userId = req.user._id;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Playlist name is required" });
    }

    const playlist = await playlistService.createPlaylist(userId, name);

    res.status(201).json(playlist);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
