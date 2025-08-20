import { Router } from "express";
import authController from "./controller/authController.js";
import playlistController from "./controller/playlistController.js";

const router = Router();

router.use("/user", authController);
router.use("/data/playlist", playlistController);

export default router;
