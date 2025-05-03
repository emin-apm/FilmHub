import { Link } from "react-router-dom";
import styles from "./MovieCardStyles.module.css";
import { formattedDate } from "../../utils/dateConvert";

export default function MovieCard({ movie }) {
  return (
    <Link className={styles.cardBox} to={`/movie/${movie.id}`}>
      <div href="/movie/123123" className={styles.cardOverlay}>
        <i className="fa-solid fa-play"></i>
      </div>

      <div className={styles.mainSliderImg}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt=""
        />
      </div>
      <div className={styles.mainSliderText}>
        <div className={styles.raitingBox}>
          {movie.vote_average.toFixed(1)}{" "}
          <span className={styles.raiting}>imdb</span>{" "}
        </div>
        <div className={styles.bottonText}>
          <div className={styles.movieName}>
            <span>{formattedDate(movie.release_date)}</span>
            <strong>{movie.title}</strong>
          </div>
          <div className={styles.category}>
            <span>Action, Epic, Superhero</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
