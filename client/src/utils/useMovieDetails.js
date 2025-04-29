import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export function useMovieDetails(movieId) {
  return useQuery({
    queryKey: ["movieDetails", movieId],
    queryFn: async () => {
      const res = await axios.get(`${BASE_URL}/movie/${movieId}`, {
        params: {
          api_key: API_KEY,
          language: "en-US",
        },
      });
      return res.data;
    },
    enabled: !!movieId,
  });
}
