import { Link } from "react-router-dom";
import { useMemo } from "react";
import styles from "./MovieCardStyles.module.css";
import { formattedDate } from "../../utils/dateConvert";
import genres from "../../data/genre.json";
import fallbackImg from "../../assets/fallbackImg.jpg";

export default function MovieCard({ movie }) {
  const {
    id,
    title,
    name,
    media_type = "movie",
    vote_average,
    poster_path,
    release_date,
    first_air_date,
    genres: genreObjects,
    genre_ids,
  } = movie;

  const genreNames = useMemo(() => {
    if (genreObjects) {
      return genreObjects
        .map((g) => g.name)
        .filter(Boolean)
        .join(", ");
    }
    if (genre_ids) {
      return genre_ids
        .map((id) => genres[id]?.name)
        .filter(Boolean)
        .join(", ");
    }
    return "No genres available";
  }, [genreObjects, genre_ids]);

  return (
    <Link className={styles.cardBox} to={`/${media_type}/${id}`}>
      <div className={styles.cardOverlay}>
        <i className="fa-solid fa-play"></i>
      </div>

      <div className={styles.mainSliderImg}>
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : fallbackImg
          }
          alt={title || name || "Poster"}
          loading="lazy"
        />
      </div>

      <div className={styles.mainSliderText}>
        <div className={styles.raitingBox}>
          {typeof vote_average === "number" ? vote_average.toFixed(1) : "N/A"}{" "}
          <span className={styles.raiting}>imdb</span>
        </div>

        <div className={styles.bottonText}>
          <div className={styles.movieName}>
            <span>{formattedDate(release_date || first_air_date)}</span>
            <strong>{title || name}</strong>
          </div>
          <div className={styles.category}>
            <span>{genreNames}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
