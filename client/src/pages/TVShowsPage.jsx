import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Catalog from "../components/Catalog/Catalog";
import { useNavigate, useLocation } from "react-router-dom";
import Pagination from "../components/Pagination/Pagination";

const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default function TVShows() {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();

  // Sync page with URL
  useEffect(() => {
    const urlParam = new URLSearchParams(location.search);
    const pageParam = urlParam.get("page");
    if (pageParam) {
      const parsedPage = parseInt(pageParam, 10);
      if (!isNaN(parsedPage)) setPage(parsedPage);
    }
  }, [location.search]);

  // Update URL on page change
  useEffect(() => {
    const urlParam = new URLSearchParams(location.search);
    if (page > 1) {
      urlParam.set("page", page);
    } else {
      urlParam.delete("page");
    }
    navigate(`${location.pathname}?${urlParam.toString()}`, {
      replace: true,
    });
  }, [page, location.pathname, navigate]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["upcomingMovies", page],
    queryFn: async () => {
      //   const res = await axios.get(`${BASE_URL}/movie/upcoming`, {
      const res = await axios.get(`${BASE_URL}/trending/tv/week`, {
        params: { api_key: API_KEY, page },
      });
      return res.data;
    },
    keepPreviousData: true,
  });

  return (
    <>
      {isLoading && <p>Loading movies...</p>}
      {error && <p style={{ color: "red" }}>Error loading movies.</p>}
      {data && (
        <>
          <Catalog title="Upcoming Movies" movies={data.results} />
          <Pagination
            currentPage={page}
            totalPages={Math.min(data.total_pages, 500)}
            onPageChange={setPage}
          />
        </>
      )}
    </>
  );
}
