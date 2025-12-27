import { useContext, useEffect, useState } from "react";
import Catalog from "../components/Catalog/Catalog";
import UserContext from "../context/UserContext";

const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

let type = {
  1: { name: "TV" },
  2: { name: "Movie" },
};

export default function WatchLaterPage() {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [movies, setMovies] = useState([]);
  const { userData, setUserData } = useContext(UserContext);

  useEffect(() => {
    try {
      if (userData.email) {
        setMovies(userData.movies);
      } else {
        const storedMovies = JSON.parse(localStorage.getItem("movies")) || [];
        setMovies(storedMovies);
      }
    } catch {
      setMovies([]);
      console.log("error");
    }
  }, []); // empty deps = run once on mount

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
      <Catalog
        title="Watch Later"
        movies={movies}
        selectedGenres={selectedGenres}
        handleGenreToggle={handleGenreToggle}
        genres={type}
      />
    </>
  );
}
