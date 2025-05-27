import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export function useMovieDetails(movieId, media_type) {
  return useQuery({
    queryKey: ["movieDetails", movieId, media_type],
    queryFn: async () => {
      const res = await axios.get(`${BASE_URL}/${media_type}/${movieId}`, {
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
