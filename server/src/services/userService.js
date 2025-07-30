import User from "../models/User";
import { getAuthResult } from "../utils/auth";

export async function login({ email, password }) {
  const user = User.findOne({ email });
  if (!user) {
    throw new Error("User not found!");
  }

  const isValid = await user.comparePassword(password);
  if (!isValid) {
    throw new Error("Password is not correct!");
  }

  return getAuthResult(user);
}
