import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("Playlist data");
});

export default router;
