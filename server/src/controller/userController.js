import { Router } from "express";
import * as userService from "../services/userService.js";
import { toLowerCase } from "../middleware/lowerCase.js";
import { cookieOptions } from "../utils/cookieOptions.js";

const router = Router();

router.post("/register", toLowerCase, async (req, res) => {
  try {
    const user = req.body;
    const result = await userService.register(user);

    res.cookie("authcookie", result.refreshToken, cookieOptions);

    res.status(201).json(result.userData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/login", toLowerCase, async (req, res) => {
  try {
    const user = req.body;
    const result = await userService.login(user);

    res.cookie("authcookie", result.refreshToken, cookieOptions);
    res.status(200).json(result.userData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/googleSign", toLowerCase, async (req, res) => {
  try {
    const user = req.body;
    const result = await userService.googleSign(user);

    res.cookie("authcookie", result.refreshToken, cookieOptions);
    res.status(200).json(result.userData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/refresh-token", async (req, res) => {
  try {
    const refreshToken = req.cookies.authcookie;
    if (!refreshToken) {
      throw new Error("Refresh token missing!");
    }

    const result = await userService.refreshToken(refreshToken);

    res.cookie("authcookie", result.refreshToken, cookieOptions);
    res.status(200).json({ accessToken: result.accessToken });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("authcookie", {
    httpOnly: true,
    secure: cookieOptions.secure,
    sameSite: cookieOptions.sameSite,
    path: cookieOptions.path,
  });
  res.status(200).json({ message: "Logged out succesfully" });
});

export default router;
