import Hero from "../components/Hero/Hero";
import PopularMovies from "../components/PopularMovies/PopularMovies";
import useGetData from "../hooks/useGetData";

const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

export default function HomePage() {
  const {
    data: popularMovies,
    isLoading: popularIsLoading,
    error: popularError,
  } = useGetData("popularMovies", `${BASE_URL}/movie/popular`);

  const {
    data: topRated,
    isLoading: topRatedIsLoading,
    error: topRatedError,
  } = useGetData("topRatedMovies", `${BASE_URL}/movie/top_rated`);

  const {
    data: latestMovies,
    isLoading: latestIsLoading,
    error: latestError,
  } = useGetData("latestMovie", `${BASE_URL}/movie/upcoming`);

  const {
    data: nowPlaying,
    isLoading: nowPlayingIsLoading,
    error: nowPlayingError,
  } = useGetData("tvShows", `${BASE_URL}/trending/tv/week`);

  return (
    <>
      <Hero />
      <PopularMovies title="Popular Movies" movies={popularMovies} />
      <PopularMovies title="Latest" movies={latestMovies} />
      <PopularMovies title="Top rated of all times" movies={topRated} />
      <PopularMovies title="TV Shows" movies={nowPlaying} />
    </>
  );
}
