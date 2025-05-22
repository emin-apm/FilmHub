import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Catalog from "../components/Catalog/Catalog";
import genres from "../data/genre.json";
import { useNavigate, useLocation } from "react-router-dom";
import Pagination from "../components/Pagination/Pagination";

const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default function ExplorePage() {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Local state for search query
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();

  // Update selectedGenres and searchQuery from URL on initial render or when the URL changes
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const genresParam = searchParams.get("genres");
    const searchTerm = searchParams.get("search");
    const pageParam = searchParams.get("page");

    if (genresParam) {
      const genresFromUrl = genresParam.split(",");
      setSelectedGenres(genresFromUrl); // Only set state if it's different
    }

    if (searchTerm) {
      setSearchQuery(searchTerm); // Set the search query from URL
    }

    if (pageParam) {
      const parsedPage = parseInt(pageParam, 10);
      if (!isNaN(parsedPage)) setPage(parsedPage);
    }
  }, [location.search]);

  // Update URL whenever selectedGenres, page or searchQuery change
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    // Update genres in URL
    if (selectedGenres.length > 0) {
      searchParams.set("genres", selectedGenres.join(","));
    } else {
      searchParams.delete("genres");
    }

    if (searchQuery) {
      searchParams.set("search", searchQuery);
    } else {
      searchParams.delete("search");
    }

    if (page && page > 1) {
      searchParams.set("page", page);
    } else {
      searchParams.delete("page");
    }

    // Update the URL with the new search parameters
    navigate(`${location.pathname}?${searchParams.toString()}`, {
      replace: true, // Replace the history state so the user can't "back" to a previous filter
    });
  }, [selectedGenres, searchQuery, page, location.pathname, navigate]);

  // Fetch movies based on selected genres and search term from URL
  const { data, isLoading, error } = useQuery({
    queryKey: ["moviesByGenres", selectedGenres, searchQuery, page],
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
          page: page,
        },
      });

      return res.data;
    },
    keepPreviousData: true,
  });

  // Handle genre toggle (adding/removing genres)
  const handleGenreToggle = (genreId) => {
    setSelectedGenres((prev) =>
      prev.includes(genreId)
        ? prev.filter((id) => id !== genreId)
        : [...prev, genreId]
    );
    setPage(1); // Reset to first page on genre change
  };

  // Handle search
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setPage(1); // Reset to first page on search
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
        <>
          <Catalog
            title="Explore Movies"
            movies={data.results}
            genres={genres}
            selectedGenres={selectedGenres}
            handleGenreToggle={handleGenreToggle}
          />
          <Pagination
            currentPage={page}
            totalPages={data.total_pages}
            onPageChange={setPage}
          />
        </>
      )}
    </>
  );
}
