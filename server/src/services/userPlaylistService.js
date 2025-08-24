import User from "../models/User.js";

export async function addUserMovie(movieData, userId) {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User doesnt exist");
  }

  if (!user.movies) {
    user.movies = [];
  }

  const alreadyExists = user.movies.some((m) => m.id === movieData.id);
  if (alreadyExists) {
    throw new Error("Movie already in list");
  }
  user.movies.push(movieData);
  await user.save();

  return user.movies;
}

export async function removeUserMovie(movieId, userId) {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User doesnt exist");
  }

  if (!user.movies || user.movies.length === 0) {
    throw new Error("No movies in list");
  }

  const movieIdNum = Number(movieId);
  const movieExists = user.movies.some((m) => m.id === movieIdNum);

  if (!movieExists) {
    throw new Error("Movie not found in list");
  }

  user.movies = user.movies.filter((m) => m.id !== movieIdNum);
  await user.save();

  return user.movies;
}
