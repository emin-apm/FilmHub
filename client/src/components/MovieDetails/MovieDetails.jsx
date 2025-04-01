import styles from "./MovieDetailsStyles.module.css";

export default function MovieDetails() {
  return (
    <section className={`container`}>
      <div className={styles.movieBanner}>
        <div className={styles.mBannerImg}>
          <img
            src="https://theconsultingdetectivesblog.com/wp-content/uploads/2014/06/the-dark-knight-original.jpg"
            alt=""
          />
        </div>
        <div className={styles.bannerContainer}>
          <div className={styles.titleContainer}>
            <h1>The Dark Knight</h1>
            <div className={styles.moreAbout}>
              <div className={styles.raiting}>
                <span>IMDB 9.0</span>
              </div>
              <div className={styles.metaData}>
                <span>17 July 2008</span>
                <span>2h 32m</span>
              </div>
            </div>

            <div className={styles.categories}>
              <a href="">Action</a>
              <a href="">Crime</a>
            </div>
          </div>
        </div>
        <div className={styles.playButton}>
          <i className="fa-solid fa-circle-play"></i>
        </div>
      </div>
      <div>asdasd</div>
    </section>
  );
}
