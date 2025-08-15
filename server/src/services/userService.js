import User from "../models/User.js";
import { getAuthResult } from "../utils/auth.js";
import jwt from "jsonwebtoken";

function getBiggerGoogleProfilePic(url, size = 450) {
  return url.replace(/s\d+-c$/, `s${size}-c`);
}

export async function login({ email, password }) {
  const user = await User.findOne({ email })
    .populate("playlist")
    .populate("sharedPlaylist");
  if (!user || !(await user.comparePassword(password)))
    throw new Error("Invalid email or password.");
  return getAuthResult(user);
}

export async function register({ email, password }) {
  if (await User.findOne({ email })) throw new Error("User already exists!");
  const user = await User.create({ email, password });
  return getAuthResult(user);
}

export async function refreshToken(token) {
  try {
    const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(payload._id)
      .populate("playlist")
      .populate("sharedPlaylist");
    if (!user) throw new Error("User not found");
    return getAuthResult(user);
  } catch {
    throw new Error("Invalid or expired refresh token");
  }
}

export async function googleSign({ access_token }) {
  // 1. Fetch user info from Google
  const res = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch Google user info");

  const payload = await res.json(); // { email, name, picture, id, etc. }
  const { email, name: username, picture: avatar } = payload;

  // 2. Find or create user
  let user = await User.findOne({ email });
  if (!user) {
    user = await User.create({
      email,
      username,
      avatar: getBiggerGoogleProfilePic(avatar),
      authProvider: "google",
    });
  }

  // 3. Populate related fields
  const populatedUser = await User.findById(user._id)
    .populate("playlist")
    .populate("sharedPlaylist");

  // 4. Return your own JWTs and user data
  return getAuthResult(populatedUser);
}
