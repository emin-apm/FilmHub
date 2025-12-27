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
    data: trendingMovieWeek,
    isLoading: trendingMovieWeekLoading,
    error: trendingMovieWeekError,
  } = useGetData("trendingMovieWeek", `${BASE_URL}/trending/movie/week`);

  const {
    data: upcominMovies,
    isLoading: upcomingMoviesLoader,
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
      <PopularMovies
        title="Popular Movies"
        movies={popularMovies}
        isLoading={popularIsLoading}
      />
      <PopularMovies
        title="Trending This Week"
        movies={trendingMovieWeek}
        isLoading={trendingMovieWeekLoading}
      />
      <PopularMovies
        title="Upcoming Movies"
        movies={upcominMovies}
        isLoading={upcomingMoviesLoader}
      />
      <PopularMovies
        title="Trending TV Shows"
        movies={nowPlaying}
        isLoading={nowPlayingIsLoading}
      />
    </>
  );
}
