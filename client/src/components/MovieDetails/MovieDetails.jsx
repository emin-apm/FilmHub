import styles from "./MovieDetailsStyles.module.css";
import TrailerModal from "../TrailerModal/TrailerModal";
import MovieSites from "./MovieSites";
import Spiner from "../Spiner/Spiner";
import { useEffect, useState } from "react";
import { formattedDate } from "../../utils/dateConvert";
import convertToEmbedUrl from "../../utils/embedUrlCovert";
import { Link, useParams } from "react-router-dom";

export default function MovieDetails({
  movie,
  trailerUrl,
  imdbRating,
  trName,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const { media_type } = useParams();

  useEffect(() => {
    if (!movie) return;
    const storedMovies = JSON.parse(localStorage.getItem("movies")) || [];
    const exists = storedMovies.some((x) => x.id === movie.id);
    setIsSaved(exists);
  }, [movie]);

  const addToWatchLater = (movie) => {
    const storedMovies = JSON.parse(localStorage.getItem("movies")) || [];
    const exist = storedMovies.some((x) => x.id === movie.id);

    if (!exist) {
      const movieWithType = { ...movie, media_type };
      storedMovies.push(movieWithType);

      localStorage.setItem("movies", JSON.stringify(storedMovies));
      setIsSaved(true);
      console.log("Movie added");
    }
  };

  const removeMovieFromLocalStorage = (movieId) => {
    const storedMovies = JSON.parse(localStorage.getItem("movies")) || [];
    const updatedMovies = storedMovies.filter((movie) => movie.id !== movieId);
    localStorage.setItem("movies", JSON.stringify(updatedMovies));
    setIsSaved(false);
    console.log("Movie removed (if it existed)");
  };

  if (!movie) return <Spiner />;

  return (
    <section className="container">
      {trailerUrl && (
        <TrailerModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          trailerUrl={convertToEmbedUrl(trailerUrl)}
        />
      )}
      <div className={styles.movieBanner}>
        <div className={styles.mBannerImg}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
            alt="Movie Banner"
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
                  {formattedDate(movie?.release_date || movie?.first_air_date)}
                </span>
                {(movie.runtime || movie.episode_run_time?.[0]) && (
                  <span>{movie.runtime || movie.episode_run_time[0]}m</span>
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
                onClick={() => removeMovieFromLocalStorage(movie.id)}
              >
                <i className="fa-solid fa-trash"></i>
                Remove
              </div>
            ) : (
              <div
                className={styles.button}
                onClick={() => addToWatchLater(movie)}
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
          <strong>IMDb: </strong>
          {imdbRating?.imdbRating || "N/A"} ({imdbRating?.imdbVotes || "N/A"})
        </p>
      </div>
    </section>
  );
}
