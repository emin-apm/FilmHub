import Playlist from "../models/Playlist.js";
import User from "../models/User.js";

export async function createPlaylist(userId, name) {
  // Create playlist with userId in sharedWith array
  const playlist = await Playlist.create({
    name,
    owner: userId,
    sharedWith: [userId],
  });

  // Add playlist ID to user's playlist array
  await User.findByIdAndUpdate(userId, {
    $push: { playlist: playlist._id },
  });

  return await Playlist.findById(playlist._id).populate(
    "owner",
    "username email avatar"
  );
}

export async function addMovieToPlaylist(playlistId, userId, movie) {
  const playlist = await Playlist.findById(playlistId);

  if (!playlist) throw new Error("Playlist not found");

  // Permission check: user must be owner or in sharedWith
  const isOwner = playlist.owner.equals(userId);
  const isShared = playlist.sharedWith.some((id) => id.equals(userId));

  if (!isOwner && !isShared) throw new Error("No permission to add movie");

  playlist.movies.push(movie);
  await playlist.save();

  return playlist;
}

export async function sharePlaylistWithUser(
  playlistId,
  currentUserId,
  userIdToAdd
) {
  const playlist = await Playlist.findById(playlistId);
  if (!playlist) throw new Error("Playlist not found");

  // Permission check: only owner or shared user can share
  const isOwner = playlist.owner.equals(currentUserId);
  const isShared = playlist.sharedWith.some((id) => id.equals(currentUserId));

  if (!isOwner && !isShared) {
    throw new Error("You do not have permission to share this playlist");
  }

  // Add new user if not already in sharedWith
  if (!playlist.sharedWith.includes(userIdToAdd)) {
    playlist.sharedWith.push(userIdToAdd);
    await playlist.save();
  }

  return await playlist.populate("sharedWith", "username email avatar");
}

//user movie service
