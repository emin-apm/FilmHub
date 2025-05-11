import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Catalog from "../components/Catalog/Catalog";
import genres from "../data/genre.json";
import { useNavigate, useLocation } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default function ExplorePage() {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Local state for search query
  const navigate = useNavigate();
  const location = useLocation();

  // Update selectedGenres and searchQuery from URL on initial render or when the URL changes
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const genresParam = searchParams.get("genres");
    const searchTerm = searchParams.get("search");

    if (genresParam) {
      const genresFromUrl = genresParam.split(",");
      setSelectedGenres(genresFromUrl); // Only set state if it's different
    }

    if (searchTerm) {
      setSearchQuery(searchTerm); // Set the search query from URL
    }
  }, [location.search]);

  // Update URL whenever selectedGenres or searchQuery change
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    // Update genres in URL
    if (selectedGenres.length > 0) {
      searchParams.set("genres", selectedGenres.join(","));
    } else {
      searchParams.delete("genres");
    }

    // Update search term in URL
    if (searchQuery) {
      searchParams.set("search", searchQuery);
    } else {
      searchParams.delete("search");
    }

    // Update the URL with the new search parameters
    navigate(`${location.pathname}?${searchParams.toString()}`, {
      replace: true, // Replace the history state so the user can't "back" to a previous filter
    });
  }, [selectedGenres, searchQuery, location.pathname, navigate]);

  // Fetch movies based on selected genres and search term from URL
  const { data, isLoading, error } = useQuery({
    queryKey: ["moviesByGenres", selectedGenres, searchQuery],
    queryFn: async () => {
      const genreString = selectedGenres.join(",");
      const url = searchQuery
        ? `${BASE_URL}/search/movie` // Use search endpoint if search query exists
        : `${BASE_URL}/discover/movie`; // Otherwise, use discover endpoint

      const res = await axios.get(url, {
        params: {
          api_key: API_KEY,
          with_genres: genreString || undefined,
          query: searchQuery || undefined, // Add search term if available
        },
      });

      return res.data.results;
    },
  });

  // Handle genre toggle (adding/removing genres)
  const handleGenreToggle = (genreId) => {
    setSelectedGenres((prev) => {
      const newGenres = prev.includes(genreId)
        ? prev.filter((id) => id !== genreId)
        : [...prev, genreId];
      return newGenres;
    });
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search for movies..."
          className="search-input"
        />
      </div>

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
    </>
  );
}
