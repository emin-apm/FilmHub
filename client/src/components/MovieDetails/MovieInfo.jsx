import Spiner from "../Spiner/Spiner";
import styles from "./MovieDetailsStyles.module.css";

export default function MovieInfo({
  movie,
  imdbRating,
  actors,
  isSaved,
  onAdd,
  onRemove,
  director,
}) {
  return (
    <div className={styles.movieDetails}>
      <div className={styles.buttonsContainer}>
        {isSaved ? (
          <div className={styles.button} onClick={onRemove}>
            <i className="fa-solid fa-trash"></i> Remove
          </div>
        ) : (
          <div className={styles.button} onClick={onAdd}>
            <i className="fa-solid fa-clapperboard"></i> Watch Later
          </div>
        )}
      </div>
      <h1>{movie.tagline}</h1>
      <p>{movie.overview}</p>
      <p>
        <strong>IMDb: </strong>
        {imdbRating?.imdbRating || "N/A"} ({imdbRating?.imdbVotes || "N/A"})
      </p>
      {imdbRating ? (
        <div className={styles.infoContainer}>
          <div>
            <p>
              <strong>Distributed by: </strong>
              {movie.production_companies?.length
                ? movie.production_companies.map((company, i) => (
                    <span key={company.id}>
                      {company.name}
                      {i < movie.production_companies.length - 1 && ", "}
                    </span>
                  ))
                : "Not Available"}
            </p>
          </div>
          <div>
            <p>
              <strong>Director: </strong>

              <a
                href={`https://www.google.com/search?q=${encodeURIComponent(
                  director
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {director}
              </a>
            </p>
            <p>
              <strong>Actors: </strong>
              {actors.map((actor, i) => (
                <span key={actor}>
                  <a
                    href={`https://www.google.com/search?q=${encodeURIComponent(
                      actor
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {actor}
                  </a>
                  {i < actors.length - 1 && ", "}
                </span>
              ))}
            </p>
          </div>
        </div>
      ) : (
        <Spiner />
      )}
    </div>
  );
}
