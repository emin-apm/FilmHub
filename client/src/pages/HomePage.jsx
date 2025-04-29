import { useQuery } from "@tanstack/react-query";
import Hero from "../components/Hero/Hero";
import PopularMovies from "../components/PopularMovies/PopularMovies";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default function HomePage() {
  const {
    data: popularMovies,
    isLoading: popularIsLoading,
    error: popularError,
  } = useQuery({
    queryKey: ["popularMovies"],
    queryFn: async () => {
      const res = await axios.get(`${BASE_URL}/movie/popular`, {
        params: {
          api_key: API_KEY,
        },
      });
      return res.data.results;
    },
  });

  const {
    data: topRated,
    isLoading: topRatedIsLoading,
    error: topRatedError,
  } = useQuery({
    queryKey: ["topRatedMovies"],
    queryFn: async () => {
      const res = await axios.get(`${BASE_URL}/movie/top_rated`, {
        params: {
          api_key: API_KEY,
        },
      });
      return res.data.results;
    },
  });

  const {
    data: latestMovies,
    isLoading: latestIsLoading,
    error: latestError,
  } = useQuery({
    queryKey: ["latestMovie"],
    queryFn: async () => {
      const res = await axios.get(`${BASE_URL}/movie/upcoming`, {
        params: {
          api_key: API_KEY,
        },
      });
      return res.data.results;
    },
  });

  const {
    data: nowPlaying,
    isLoading: nowPlayingIsLoading,
    error: nowPlayingError,
  } = useQuery({
    queryKey: ["nowPlayingMovies"],
    queryFn: async () => {
      const res = await axios.get(`${BASE_URL}/movie/now_playing`, {
        params: {
          api_key: API_KEY,
        },
      });
      return res.data.results;
    },
  });

  return (
    <>
      <Hero />
      <PopularMovies title="Popular Movies" movies={popularMovies} />
      <PopularMovies title="Top rated of all times" movies={topRated} />
      <PopularMovies title="Latest" movies={latestMovies} />
      <PopularMovies title="Now Playing" movies={nowPlaying} />
    </>
  );
}
