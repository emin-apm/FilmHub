import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const useMovieTrailer = (movieId) => {
  return useQuery({
    queryKey: ["movieTrailer", movieId],
    queryFn: async () => {
      const res = await axios.get(`${BASE_URL}/movie/${movieId}/videos`, {
        params: { api_key: API_KEY },
      });

      const trailers = res.data.results;
      const youtubeTrailer = trailers.find(
        (video) => video.site === "YouTube" && video.type === "Trailer"
      );

      return youtubeTrailer
        ? `https://www.youtube.com/embed/${youtubeTrailer.key}?autoplay=1`
        : null;
    },
    enabled: !!movieId,
  });
};
