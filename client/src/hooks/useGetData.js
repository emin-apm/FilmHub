import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default function useGetData(queryKey, link) {
  return useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const res = await axios.get(link, {
        params: {
          api_key: API_KEY,
        },
      });
      return res.data.results;
    },
  });
}
