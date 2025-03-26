import styles from "./MovieCardStyles.module.css";

export default function MovieCard() {
  return (
    <div className={styles.cardBox}>
      <a href="" className={styles.cardOverlay}>
        <i className="fa-solid fa-play"></i>
      </a>

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
    </div>
  );
}
