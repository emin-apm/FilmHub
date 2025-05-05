import MovieDetails from "../components/MovieDetails/MovieDetails";
import { useParams } from "react-router-dom";

import { useMovieDetails } from "../hooks/useMovieDetails";
import { useMovieTrailer } from "../hooks/useMovieTrailer";
import { useImdbRating } from "../hooks/useImdbRaiting";

export default function MoviePage() {
  const { id } = useParams();

  const { data: movie, isLoading, error } = useMovieDetails(id);
  const { data: trailerUrl, isLoading: trailerLoading } = useMovieTrailer(id);
  const { data: imdbRating, isLoading: ratingLoading } = useImdbRating(
    movie?.imdb_id
  );

  if (isLoading || trailerLoading || ratingLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading movie details</p>;

  return (
    <MovieDetails
      movie={movie}
      trailerUrl={trailerUrl}
      imdbRating={imdbRating}
    />
  );
}
