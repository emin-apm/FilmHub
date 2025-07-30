import { generateAccessToken, generateRefreshToken } from "./tokenService";

export function getAuthResult(user) {
  const accesToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  return {
    userData: {
      _id: user._id,
      email: user.email,
      accesToken,
    },
    refreshToken,
  };
}
