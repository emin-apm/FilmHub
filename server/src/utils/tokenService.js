import jwt from "jsonwebtoken";

export function generateAccessToken(user) {
  const payload = { _id: user._id, email: user.email };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "10m" });
}

export function generateRefreshToken(user) {
  const payload = { _id: user._id, email: user.email };
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
}
