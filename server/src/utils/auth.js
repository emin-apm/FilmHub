import { generateAccessToken, generateRefreshToken } from "./tokenService.js";

export function getAuthResult(user) {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  return {
    refreshToken,
    userData: {
      _id: user._id,
      email: user.email,
      username: user.username,
      avatar: user.avatar,
      playlist: user.playlist || [],
      sharedPlaylist: user.sharedPlaylist || [],
      accessToken,
    },
  };
}
