import MovieCard from "../MovieCard/MovieCard";
import styles from "./CatalogStyles.module.css";

export default function Catalog({
  title,
  movies,
  genres,
  selectedGenres,
  handleGenreToggle,
}) {
  // Sort genres by name (value)
  const sortedGenres = genres
    ? Object.entries(genres).sort(([, a], [, b]) => a.localeCompare(b))
    : [];

  return (
    <section className={`${styles.catalogContainer} container`}>
      <div className={styles.heading}>
        <h2 className={styles.headingTitle}>{title}</h2>
      </div>

      {/* Genre buttons */}
      {sortedGenres.length > 0 && (
        <div className={styles.buttonContainer}>
          {sortedGenres.map(([id, name]) => (
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

      {/* Movie cards */}
      <div className={styles.moviesContainer}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}
