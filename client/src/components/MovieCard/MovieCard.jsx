import { Link } from "react-router-dom";
import styles from "./MovieCardStyles.module.css";
import { formattedDate } from "../../utils/dateConvert";
import genres from "../../data/genre.json";

export default function MovieCard({ movie }) {
  const genreNames = movie.genre_ids
    ?.map((id) => genres[id])
    .filter(Boolean)
    .join(", ");

  return (
    <Link className={styles.cardBox} to={`/movie/${movie.id}`}>
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
          {movie.vote_average.toFixed(1)}{" "}
          <span className={styles.raiting}>imdb</span>
        </div>

        <div className={styles.bottonText}>
          <div className={styles.movieName}>
            <span>{formattedDate(movie.release_date)}</span>
            <strong>{movie.title}</strong>
          </div>
          <div className={styles.category}>
            <span>{genreNames || "No genres available"}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
