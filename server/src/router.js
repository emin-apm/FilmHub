import { Router } from "express";
import authController from "./controller/authController.js";
import playlistController from "./controller/playlistController.js";
import userPlaylistController from "./controller/userPlaylistController.js";

const router = Router();

router.use("/user", authController);
router.use("/data/playlist", playlistController);
router.use("/data/userPlaylist", userPlaylistController);

export default router;
