import { Router } from "express";
import userController from "./controller/userController.js";
import playlistController from "./controller/playlistController.js";

const router = Router();

router.use("/user", userController);
router.use("/data/playlist", playlistController);

export default router;
