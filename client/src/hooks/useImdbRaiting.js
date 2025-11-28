import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const OMBD_API_KEY = import.meta.env.VITE_OMBD_API_KEY;
const TMDB_BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const useImdbRating = (tmdbId, media_type, movieImdbId) => {
  return useQuery({
    queryKey: ["imdbRating", tmdbId, media_type, movieImdbId],
    queryFn: async () => {
      let imdbId = movieImdbId;

      if (media_type === "tv") {
        const res = await axios.get(
          `${TMDB_BASE_URL}/tv/${tmdbId}/external_ids`,
          {
            params: { api_key: TMDB_API_KEY },
          }
        );
        imdbId = res.data.imdb_id;
        if (!imdbId) return null;
      }

      if (!imdbId) return null;

      const omdbRes = await axios.get(`https://www.omdbapi.com/`, {
        params: { apikey: OMBD_API_KEY, i: imdbId },
      });

      return omdbRes.data;
    },
    enabled: !!tmdbId,
  });
};
