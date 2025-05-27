// hooks/useMovieTrailer.js
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export function useMovieTrailer(id, media_type = "movie") {
  return useQuery({
    queryKey: ["movieTrailer", id, media_type],
    queryFn: async () => {
      const res = await axios.get(`${BASE_URL}/${media_type}/${id}/videos`, {
        params: {
          api_key: API_KEY,
          language: "en-US",
        },
      });

      const trailer = res.data.results.find(
        (video) =>
          video.type === "Trailer" && video.site === "YouTube" && video.official
      );

      return trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;
    },
    enabled: !!id,
  });
}
