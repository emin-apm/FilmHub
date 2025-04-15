import { Link } from "react-router-dom";
import styles from "./MovieCardStyles.module.css";

export default function MovieCard() {
  return (
    <Link className={styles.cardBox} to={"/movie/123"}>
      <div href="/movie/123123" className={styles.cardOverlay}>
        <i className="fa-solid fa-play"></i>
      </div>

      <div className={styles.mainSliderImg}>
        <img
          src="https://m.media-amazon.com/images/M/MV5BMTk4ODQzNDY3Ml5BMl5BanBnXkFtZTcwODA0NTM4Nw@@._V1_.jpg"
          alt=""
        />
      </div>
      <div className={styles.mainSliderText}>
        <div className={styles.raitingBox}>
          9.0 <span className={styles.raiting}>imdb</span>{" "}
        </div>
        <div className={styles.bottonText}>
          <div className={styles.movieName}>
            <span>July 25, 2008</span>
            <strong>The Dark Knigh</strong>
          </div>
          <div className={styles.category}>
            <span>Action, Epic, Superhero</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
