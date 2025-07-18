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
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const genresParam = searchParams.get("genres");
    const searchTerm = searchParams.get("search");
    const pageParam = searchParams.get("page");
    if (genresParam) {
      const genresFromUrl = genresParam.split(",");
      setSelectedGenres(genresFromUrl);
    }

    if (searchTerm) {
      setSearchQuery(searchTerm);
    }

    if (pageParam) {
      const parsedPage = parseInt(pageParam, 10);
      if (!isNaN(parsedPage)) setPage(parsedPage);
    }
  }, [location.search]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

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

    navigate(`${location.pathname}?${searchParams.toString()}`, {
      replace: true,
    });
  }, [selectedGenres, searchQuery, page, location.pathname, navigate]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["exploreMovies", selectedGenres, searchQuery, page],
    queryFn: async () => {
      const genreString = selectedGenres.join(",");

      if (searchQuery) {
        const [movieRes, tvRes] = await Promise.all([
          axios.get(`${BASE_URL}/search/movie`, {
            params: {
              api_key: API_KEY,
              query: searchQuery,
              page,
            },
          }),
          axios.get(`${BASE_URL}/search/tv`, {
            params: {
              api_key: API_KEY,
              query: searchQuery,
              page,
            },
          }),
        ]);

        const movieResults = movieRes.data.results.map((item) => ({
          ...item,
          media_type: "movie",
        }));

        const tvResults = tvRes.data.results.map((item) => ({
          ...item,
          media_type: "tv",
        }));

        return {
          results: [...movieResults, ...tvResults],
          total_pages: Math.max(
            movieRes.data.total_pages,
            tvRes.data.total_pages
          ),
        };
      } else {
        const res = await axios.get(`${BASE_URL}/discover/movie`, {
          params: {
            api_key: API_KEY,
            with_genres: genreString || undefined,
            page,
          },
        });

        return {
          results: res.data.results.map((item) => ({
            ...item,
            media_type: "movie",
          })),
          total_pages: res.data.total_pages,
        };
      }
    },
    keepPreviousData: true,
  });

  const handleGenreToggle = (genreId) => {
    setSelectedGenres((prev) =>
      prev.includes(genreId)
        ? prev.filter((id) => id !== genreId)
        : [...prev, genreId]
    );
    setPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  return (
    <>
      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search for movies or TV shows..."
          className="search-input"
        />
      </div>

      <>
        <Catalog
          title="Explore Movies & TV Shows"
          movies={data?.results}
          genres={genres}
          selectedGenres={selectedGenres}
          handleGenreToggle={handleGenreToggle}
          isLoading={isLoading}
          error={error}
        />
        {data?.total_pages && (
          <Pagination
            currentPage={page}
            totalPages={Math.min(data.total_pages, 500)}
            onPageChange={setPage}
          />
        )}
      </>
    </>
  );
}
