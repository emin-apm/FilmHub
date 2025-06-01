import { Link } from "react-router-dom";
import styles from "./MovieCardStyles.module.css";
import { formattedDate } from "../../utils/dateConvert";
import genres from "../../data/genre.json";

export default function MovieCard({ movie }) {
  let genreNames;

  if (movie.genres) {
    genreNames = movie.genres
      .map((genre) => genre.name)
      .filter(Boolean)
      .join(", ");
  } else if (movie.genre_ids) {
    genreNames = movie.genre_ids
      .map((id) => genres[id])
      .filter(Boolean)
      .join(", ");
  } else {
    genreNames = "No genres available";
  }

  return (
    <Link
      className={styles.cardBox}
      to={`/${movie.media_type || "movie"}/${movie.id}`}
    >
      <div className={styles.cardOverlay}>
        <i className="fa-solid fa-play"></i>
      </div>

      <div className={styles.mainSliderImg}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
      </div>

      <div className={styles.mainSliderText}>
        <div className={styles.raitingBox}>
          {typeof movie.vote_average === "number"
            ? movie.vote_average.toFixed(1)
            : "N/A"}{" "}
          <span className={styles.raiting}>imdb</span>
        </div>

        <div className={styles.bottonText}>
          <div className={styles.movieName}>
            <span>
              {formattedDate(movie.release_date || movie.first_air_date)}
            </span>
            <strong>{movie.title || movie.name}</strong>
          </div>
          <div className={styles.category}>
            <span>{genreNames || "No genres available"}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
