import { generateAccessToken, generateRefreshToken } from "./tokenService.js";

export function getAuthResult(user) {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  return {
    refreshToken,
    userData: {
      accessToken,
      _id: user._id,
      email: user.email,
      username: user.username,
      avatar: user.avatar,
      movies: user.movies || [],
      sharedPlaylist: user.sharedPlaylist || [],
    },
  };
}
