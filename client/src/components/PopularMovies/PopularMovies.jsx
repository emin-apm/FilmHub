import styles from "./PopularMoviesStyles.module.css";

export default function PopularMovies() {
  return (
    <>
      <section className={`${styles.popular} container`}>
        <div className={styles.heading}>
          <h2 className={styles.headingTitle}>Popular movies</h2>
          <div className={styles.arrows}>
            <i className="fa-solid fa-chevron-left"></i>
            <i className="fa-solid fa-chevron-right"></i>
          </div>
        </div>
      </section>
    </>
  );
}
