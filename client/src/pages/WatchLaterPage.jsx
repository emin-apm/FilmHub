import { useState } from "react";
import Catalog from "../components/Catalog/Catalog";
import useGetData from "../hooks/useGetData";

const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

let type = {
  1: "TV",
  2: "Movie",
};

export default function WatchLaterPage() {
  const [selectedGenres, setSelectedGenres] = useState([]);

  const { data, isLoading, error } = useGetData(
    "upcominMovies",
    `${BASE_URL}/movie/upcoming`
  );

  const handleGenreToggle = (genreId) => {
    setSelectedGenres((prev) =>
      prev.includes(genreId)
        ? prev.filter((id) => id !== genreId)
        : [...prev, genreId]
    );
    // setPage(1);
  };

  return (
    <>
      {isLoading && <p>Loading movies...</p>}
      {error && <p style={{ color: "red" }}>Error loading movies.</p>}
      {data && (
        <Catalog
          title="Watch Later"
          movies={data}
          selectedGenres={selectedGenres}
          handleGenreToggle={handleGenreToggle}
          genres={type}
        />
      )}
    </>
  );
}
