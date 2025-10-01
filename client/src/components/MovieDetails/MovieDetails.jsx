import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import styles from "./MovieDetailsStyles.module.css";
import TrailerModal from "../TrailerModal/TrailerModal";
import MovieSites from "./MovieSites";
import fallbackImg from "../../assets/fallbackImg.jpg";
import UserContext from "../../context/UserContext";
import * as userPlaylistService from "../../services/userListService";
import { formattedDate } from "../../utils/dateConvert";
import convertToEmbedUrl from "../../utils/embedUrlCovert";

export default function MovieDetails({
  movie,
  trailerUrl,
  imdbRating,
  trName,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const { media_type } = useParams();
  const { userData, setUserData } = useContext(UserContext);

  const userId = userData?._id;

  const addMovieMutation = useMutation({
    mutationFn: ({ userId, movie }) =>
      userPlaylistService.addMovie(userId, movie),
    onMutate: async ({ movie }) => {
      setIsSaved(true),
        setUserData((prev) => ({
          ...prev,
          movies: [...(prev.movies || []), movie],
        }));
    },
    onError: (error) => {
      console.log("Erro adding movie", error.message);
    },
  });

  const removeMovieMutation = useMutation({
    mutationFn: ({ userId, movieId }) =>
      userPlaylistService.removeMovie(userId, movieId),
    onMutate: async ({ movieId }) => {
      setIsSaved(false);
      setUserData((prev) => ({
        movies: [prev.movies || []].filter((x) => x.id != movieId),
      }));
    },
  });

  const handleAddMovie = (movie) => {
    if (userId) {
      addMovieMutation.mutate({ userId, movie: { ...movie, media_type } });
    } else {
      const storedMovies = JSON.parse(localStorage.getItem("movies")) || [];
      if (!storedMovies.some((x) => x.id === movie.id)) {
        storedMovies.push({ ...movie, media_type });
        localStorage.setItem("movies", JSON.stringify(storedMovies));
        setIsSaved(true);
      }
    }
  };

  const handleRemoveMovie = (movieId) => {
    if (userId) {
      removeMovieMutation.mutate({ userId, movieId });
    } else {
      const storedMovies = JSON.parse(localStorage.getItem("movies")) || [];
      const updatedMovies = storedMovies.filter((m) => m.id !== movieId);
      localStorage.setItem("movies", JSON.stringify(updatedMovies));
      setIsSaved(false);
    }
  };

  useEffect(() => {
    if (!movie) return;

    if (userId) {
      const exists = userData.movies?.some((x) => x.id === movie.id);
      setIsSaved(exists);
    } else {
      const storedMovies = JSON.parse(localStorage.getItem("movies")) || [];
      const exists = storedMovies.some((x) => x.id === movie.id);
      setIsSaved(exists);
    }
  }, [movie, userId, userData.movies]);

  if (!movie) return null;

  return (
    <section className="container">
      {trailerUrl && isModalOpen && (
        <TrailerModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          trailerUrl={convertToEmbedUrl(trailerUrl)}
        />
      )}

      <div className={styles.movieBanner}>
        <div className={styles.mBannerImg}>
          <img
            src={
              movie.backdrop_path
                ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
                : fallbackImg
            }
            alt={`Backdrop image for ${movie.title || movie.name}`}
          />
        </div>
        <div className={styles.bannerContainer}>
          <div className={styles.titleContainer}>
            <h1 className={styles.movieTitle}>{movie.title || movie.name}</h1>
            <div className={styles.moreAbout}>
              <div className={styles.raiting}>
                <span>IMDB {imdbRating?.imdbRating || "N/A"}</span>
              </div>
              <div className={styles.metaData}>
                <span>
                  <i className="fa-regular fa-calendar"></i>
                  {formattedDate(movie?.release_date || movie?.first_air_date)}
                </span>
                {(movie.runtime || movie.episode_run_time?.[0]) && (
                  <span>
                    <i className="fa-regular fa-clock"></i>
                    {movie.runtime || movie.episode_run_time[0]}m
                  </span>
                )}
              </div>
            </div>
            <div className={styles.categories}>
              {movie.genres?.map((genre) => (
                <Link key={genre.id} to={`/explore?genres=${genre.id}`}>
                  {genre.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div
          className={styles.playButton}
          onClick={() => setIsModalOpen(true)}
          aria-label={`Play trailer for ${movie.title}`}
        >
          <i className="fa-solid fa-circle-play"></i>
        </div>
      </div>
      <MovieSites title={movie.title || movie.name} trName={trName} />

      <div className={styles.movieDetails}>
        <div className={styles.buttonsContainer}>
          <div className={styles.buttonsContainer}>
            {isSaved ? (
              <div
                className={styles.button}
                onClick={() => handleRemoveMovie(movie.id)}
              >
                <i className="fa-solid fa-trash"></i>
                Remove
              </div>
            ) : (
              <div
                className={styles.button}
                onClick={() => handleAddMovie(movie)}
              >
                <i className="fa-solid fa-clapperboard"></i>
                Watch Later
              </div>
            )}
          </div>
        </div>
        <h1>{movie.tagline}</h1>
        <p>{movie.overview}</p>
        {movie.budget && (
          <p>
            <strong>Budget: </strong> ${movie.budget.toLocaleString()}
          </p>
        )}
        <p>
          <strong>Distributed by: </strong>
          {movie.production_companies?.length > 0 ? (
            movie.production_companies.map((company, index) => (
              <span key={company.id}>
                {company.name}
                {index < movie.production_companies.length - 1 && ", "}
              </span>
            ))
          ) : (
            <span>Not Available</span>
          )}
        </p>
        <p>
          <strong>Actors: </strong>

          {imdbRating?.Actors.split(", ").map((actor, index) => (
            <span key={actor}>
              <a
                href={`https://www.google.com/search?q=${encodeURIComponent(
                  actor
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {actor}
              </a>
              {index < imdbRating.Actors.split(", ").length - 1 && ", "}
            </span>
          ))}
        </p>
        <p>
          <strong>IMDb: </strong>
          {imdbRating?.imdbRating || "N/A"} ({imdbRating?.imdbVotes || "N/A"})
        </p>
      </div>
    </section>
  );
}
