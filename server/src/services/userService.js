import User from "../models/User";
import { getAuthResult } from "../utils/auth";
import jwt from "jsonwebtoken";

export async function login({ email, password }) {
  const user = await User.findOne({ email });

  if (!user || !(await user.comparePassword(password))) {
    throw new Error("Invalid email or password.");
  }

  return getAuthResult(user);
}

export async function register({ email, password }) {
  const isExist = await User.findOne({ email: email });
  if (isExist) {
    throw new Error("User already exists!");
  }

  const user = await User.create({ email, password });

  return getAuthResult(user);
}

export async function refreshToken(token) {
  try {
    const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    const user = await User.findById(payload._id);
    if (!user) {
      throw new Error("User not found");
    }
    return getAuthResult(user);
  } catch (error) {
    throw new Error("Invalid or expired refresh token");
  }
}

export async function googleSign({ email, username, avatar }) {
  let user = await User.findOne({ email });

  if (!user) {
    user = await User.create({
      email,
      username,
      avatar,
      authProvider: "google",
    });
  } else if (user.authProvider !== "google") {
    throw new Error("This email is already registered with a different method");
  }

  return getAuthResult(user);
}
