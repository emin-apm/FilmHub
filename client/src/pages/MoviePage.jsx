import MovieDetails from "../components/MovieDetails/MovieDetails";
import { useParams } from "react-router-dom";

import { useMovieDetails } from "../hooks/useMovieDetails";
import { useMovieTrailer } from "../hooks/useMovieTrailer";
import { useImdbRating } from "../hooks/useImdbRaiting";

export default function MoviePage() {
  const { id, media_type } = useParams();

  const {
    data: movie,
    isLoading: movieLoading,
    error: movieError,
  } = useMovieDetails(id, media_type);
  const { data: TRnaming } = useMovieDetails(id, media_type, "tr");
  const {
    data: trailerUrl,
    isLoading: trailerLoading,
    error: trailerError,
  } = useMovieTrailer(id, media_type);
  const {
    data: imdbRating,
    isLoading: ratingLoading,
    error: ratingError,
  } = useImdbRating(movie?.imdb_id);

  const isLoading = movieLoading || trailerLoading;
  const error = movieError || trailerError;

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  return (
    <MovieDetails
      movie={movie}
      trailerUrl={trailerUrl}
      imdbRating={imdbRating}
      trName={TRnaming?.title || undefined}
    />
  );
}
