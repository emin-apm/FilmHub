import { Router } from "express";
import * as authService from "../services/authService.js";
import { toLowerCase } from "../middleware/lowerCase.js";
import { cookieOptions } from "../utils/cookieOptions.js";

const router = Router();

router.post("/register", toLowerCase, async (req, res) => {
  try {
    const result = await authService.register(req.body);
    res.cookie("authcookie", result.refreshToken, cookieOptions);
    res.status(201).json(result.userData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/login", toLowerCase, async (req, res) => {
  try {
    const result = await authService.login(req.body);
    res.cookie("authcookie", result.refreshToken, cookieOptions);
    res.status(200).json(result.userData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/googleSign", toLowerCase, async (req, res) => {
  try {
    const { access_token } = req.body;

    if (!access_token) throw new Error("No token provided");

    // Pass access_token to service
    const result = await authService.googleSign({ access_token });

    res.cookie("authcookie", result.refreshToken, cookieOptions);
    res.status(200).json(result.userData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/refresh-token", async (req, res) => {
  try {
    const refreshToken = req.cookies.authcookie;
    if (!refreshToken) throw new Error("Refresh token missing!");

    const result = await authService.refreshToken(refreshToken);

    res.cookie("authcookie", result.refreshToken, cookieOptions);

    res.status(200).json({
      accessToken: result.userData.accessToken,
      userData: result.userData,
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("authcookie", cookieOptions);
  res.status(200).json({ message: "Logged out successfully" });
});

export default router;
