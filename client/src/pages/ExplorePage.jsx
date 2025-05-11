import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Catalog from "../components/Catalog/Catalog";
import genres from "../data/genre.json";

const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default function ExplorePage() {
  const [selectedGenres, setSelectedGenres] = useState([]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["moviesByGenres", selectedGenres],
    queryFn: async () => {
      const genreString = selectedGenres.join(",");
      const url = selectedGenres.length
        ? `${BASE_URL}/discover/movie`
        : `${BASE_URL}/movie/popular`;

      const res = await axios.get(url, {
        params: {
          api_key: API_KEY,
          with_genres: genreString || undefined,
        },
      });

      return res.data.results;
    },
  });

  const handleGenreToggle = (genreId) => {
    setSelectedGenres((prev) => {
      if (prev.includes(genreId)) {
        return prev.filter((id) => id !== genreId);
      } else {
        return [...prev, genreId];
      }
    });
  };

  return (
    <div style={{ padding: "1rem" }}>
      {isLoading && <p>Loading movies...</p>}
      {error && <p style={{ color: "red" }}>Error loading movies.</p>}
      {data && (
        <Catalog
          title="Explore Movies"
          movies={data}
          genres={genres}
          selectedGenres={selectedGenres}
          handleGenreToggle={handleGenreToggle}
        />
      )}
    </div>
  );
}
