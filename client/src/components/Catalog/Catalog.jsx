import MovieCard from "../MovieCard/MovieCard";
import Spiner from "../Spiner/Spiner";
import styles from "./CatalogStyles.module.css";

export default function Catalog({
  title,
  movies,
  genres,
  selectedGenres,
  handleGenreToggle,
  isLoading,
  error,
  authLoading,
}) {
  const sortedGenres = genres
    ? Object.entries(genres).sort(([, a], [, b]) =>
        a.name.localeCompare(b.name)
      )
    : [];

  return (
    <section className={`${styles.catalogContainer} container`}>
      <div className={styles.heading}>
        <h2 className={styles.headingTitle}>{title}</h2>
      </div>
      {/* Genre buttons */}
      {sortedGenres.length > 0 && (
        <div className={styles.buttonContainer}>
          {sortedGenres.map(([id, { name, icon }]) => (
            <button
              key={id}
              onClick={() => handleGenreToggle(id)}
              className={
                selectedGenres.includes(id)
                  ? styles.selectedButton
                  : styles.button
              }
            >
              {icon && <i className={`fa-solid ${icon}`}></i>}
              {name}
            </button>
          ))}
        </div>
      )}

      {authLoading ? (
        <Spiner />
      ) : error ? (
        <div className={"error"}>
          <p>Error loading movies...</p>
        </div>
      ) : isLoading ? (
        <Spiner />
      ) : movies && movies.length > 0 ? (
        <div className={styles.moviesContainer}>
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className={styles.moviesContainer}>
          <h1 style={{ textAlign: "center" }}>No Movies...</h1>
        </div>
      )}
    </section>
  );
}
