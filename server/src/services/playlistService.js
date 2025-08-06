import Playlist from "../models/Playlist.js";
import User from "../models/User.js";

export async function createPlaylist(userId, name) {
  // Create playlist with userId in sharedWith array
  const playlist = await Playlist.create({
    name,
    createdBy: userId,
    sharedWith: [userId],
  });

  // Add playlist ID to user's playlist array
  await User.findByIdAndUpdate(userId, {
    $push: { playlist: playlist._id },
  });

  return await Playlist.findById(playlist._id).populate("createdBy");
}
