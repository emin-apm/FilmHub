import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const OMBD_API_KEY = import.meta.env.VITE_OMBD_API_KEY;

export const useImdbRating = (imdbId) => {
  return useQuery({
    queryKey: ["imdbRating", imdbId],
    queryFn: async () => {
      const res = await axios.get(`https://www.omdbapi.com/`, {
        params: {
          apikey: OMBD_API_KEY,
          i: imdbId,
        },
      });
      return res.data;
    },
    enabled: !!imdbId,
  });
};
