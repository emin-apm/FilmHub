import { Link } from "react-router-dom";
import styles from "./MovieDetailsStyles.module.css";

import { formattedDate } from "../../utils/dateConvert";

export default function MovieBanner({
  movie,
  title,
  setIsModalOpen,
  fallbackImg,
  raiting,
}) {
  return (
    <div className={styles.movieBanner}>
      <div className={styles.mBannerImg}>
        <img
          src={
            movie.backdrop_path
              ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
              : fallbackImg
          }
          alt={`Backdrop image for ${title}`}
        />
      </div>
      <div className={styles.bannerContainer}>
        <div className={styles.titleContainer}>
          <h1 className={styles.movieTitle}>{title}</h1>
          <div className={styles.moreAbout}>
            <div className={styles.raiting}>
              <span>IMDB {raiting || "N/A"}</span>
            </div>
            <div className={styles.metaData}>
              <span>
                <i className="fa-regular fa-calendar"></i>
                {formattedDate(movie.release_date || movie.first_air_date)}
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
        aria-label={`Play trailer for ${title}`}
      >
        <i className="fa-solid fa-circle-play"></i>
      </div>
    </div>
  );
}
