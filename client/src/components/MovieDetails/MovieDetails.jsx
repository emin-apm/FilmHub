import styles from "./MovieDetailsStyles.module.css";
import TrailerModal from "../TrailerModal/TrailerModal";
import MovieSites from "./MovieSites";
import Spiner from "../Spiner/Spiner";
import { useState } from "react";
import { formattedDate } from "../../utils/dateConvert";

export default function MovieDetails({ movie, trailerUrl, imdbRating }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!movie) return <Spiner />;

  return (
    <section className="container">
      <TrailerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        trailerUrl={trailerUrl}
      />
      <div className={styles.movieBanner}>
        <div className={styles.mBannerImg}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
            alt="Movie Banner"
          />
        </div>
        <div className={styles.bannerContainer}>
          <div className={styles.titleContainer}>
            <h1 className={styles.movieTitle}>{movie.title}</h1>
            <div className={styles.moreAbout}>
              <div className={styles.raiting}>
                <span>IMDB {imdbRating?.imdbRating || "N/A"}</span>
              </div>
              <div className={styles.metaData}>
                <span>{formattedDate(movie.release_date)}</span>
                <span>{movie.runtime}m</span>
              </div>
            </div>
            <div className={styles.categories}>
              {movie.genres.map((genre) => (
                <a key={genre.id} href="#">
                  {genre.name}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.playButton} onClick={() => setIsModalOpen(true)}>
          <i className="fa-solid fa-circle-play"></i>
        </div>
      </div>
      <div className={styles.movieDetails}>
        <h1>{movie.title}</h1>
        <p>{movie.overview}</p>
        <p>
          <strong>Budget: </strong> ${movie.budget.toLocaleString()}
        </p>
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

      <MovieSites title={movie.title} />
    </section>
  );
}
