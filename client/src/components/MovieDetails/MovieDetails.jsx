import { useContext, useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import TrailerModal from "../TrailerModal/TrailerModal";
import MovieSites from "./MovieSites";
import fallbackImg from "../../assets/fallbackImg.jpg";
import UserContext from "../../context/UserContext";
import * as userPlaylistService from "../../services/userListService";
import convertToEmbedUrl from "../../utils/embedUrlCovert";
import MovieBanner from "./MovieBanner";
import MovieInfo from "./MovieInfo";

// --- LocalStorage Helpers ---
const getStoredMovies = () => JSON.parse(localStorage.getItem("movies")) || [];
const setStoredMovies = (movies) =>
  localStorage.setItem("movies", JSON.stringify(movies));

export default function MovieDetails({ movie, trailerUrl, imdbRating }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const { media_type } = useParams();
  const { userData, setUserData } = useContext(UserContext);
  const userId = userData?._id;

  // --- Memoized Derived Values ---
  const title = useMemo(() => movie?.title || movie?.name, [movie]);
  const runtime = useMemo(
    () => movie?.runtime || movie?.episode_run_time?.[0],
    [movie]
  );
  const releaseDate = useMemo(
    () => movie?.release_date || movie?.first_air_date,
    [movie]
  );
  const actors = useMemo(
    () => imdbRating?.Actors?.split(", ") || [],
    [imdbRating]
  );
  const embedUrl = useMemo(
    () => (trailerUrl ? convertToEmbedUrl(trailerUrl) : null),
    [trailerUrl]
  );

  // --- React Query Mutations ---
  const addMovieMutation = useMutation({
    mutationFn: ({ userId, movie }) =>
      userPlaylistService.addMovie(userId, movie),
    onMutate: ({ movie }) => {
      setIsSaved(true);
      setUserData((prev) => ({
        ...prev,
        movies: [...(prev.movies || []), movie],
      }));
    },
    onError: (error) => console.log("Error adding movie:", error.message),
  });

  const removeMovieMutation = useMutation({
    mutationFn: ({ userId, movieId }) =>
      userPlaylistService.removeMovie(userId, movieId),
    onMutate: ({ movieId }) => {
      setIsSaved(false);
      setUserData((prev) => ({
        ...prev,
        movies: (prev.movies || []).filter((x) => x.id !== movieId),
      }));
    },
    onError: (error) => console.log("Error removing movie:", error.message),
  });

  // --- Handlers ---
  const handleAddMovie = () => {
    const movieData = { ...movie, media_type };
    if (userId) {
      addMovieMutation.mutate({ userId, movie: movieData });
    } else {
      const storedMovies = getStoredMovies();
      if (!storedMovies.some((x) => x.id === movie.id)) {
        storedMovies.push(movieData);
        setStoredMovies(storedMovies);
        setIsSaved(true);
      }
    }
  };

  const handleRemoveMovie = () => {
    if (userId) {
      removeMovieMutation.mutate({ userId, movieId: movie.id });
    } else {
      const updatedMovies = getStoredMovies().filter((m) => m.id !== movie.id);
      setStoredMovies(updatedMovies);
      setIsSaved(false);
    }
  };

  // --- Check if movie is saved ---
  useEffect(() => {
    if (!movie) return;
    const exists = userId
      ? userData.movies?.some((x) => x.id === movie.id)
      : getStoredMovies().some((x) => x.id === movie.id);
    setIsSaved(exists);
  }, [movie, userId, userData.movies]);

  if (!movie) return null;

  return (
    <section className="container">
      <TrailerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        seasons={movie.seasons}
      />

      <MovieBanner
        movie={movie}
        title={title}
        setIsModalOpen={setIsModalOpen}
        fallbackImg={fallbackImg}
        raiting={imdbRating?.imdbRating}
      />

      <MovieSites title={title} />

      <MovieInfo
        movie={movie}
        imdbRating={imdbRating}
        actors={actors}
        runtime={runtime}
        releaseDate={releaseDate}
        isSaved={isSaved}
        onAdd={handleAddMovie}
        onRemove={handleRemoveMovie}
      />
    </section>
  );
}
