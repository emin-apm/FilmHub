import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("Login/register data");
});

router.post("/register", (req, res) => {
  res.send("User register");
});

router.post("/login", (req, res) => {
  res.send("User login");
});

export default router;
