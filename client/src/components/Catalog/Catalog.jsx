import MovieCard from "../MovieCard/MovieCard";
import styles from "./CatalogStyles.module.css";

export default function Catalog({
  title,
  movies,
  genres,
  selectedGenres,
  handleGenreToggle,
}) {
  return (
    <section className={`${styles.catalogContainer} container`}>
      <div className={styles.heading}>
        <h2 className={styles.headingTitle}>{title}</h2>
      </div>
      {genres && (
        <div className={styles.buttonContainer}>
          {Object.entries(genres).map(([id, name]) => (
            <button
              key={id}
              onClick={() => handleGenreToggle(id)}
              className={
                selectedGenres.includes(id)
                  ? styles.selectedButton
                  : styles.button
              }
            >
              {name}
            </button>
          ))}
        </div>
      )}

      <div className={styles.moviesContainer}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}
