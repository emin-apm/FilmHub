import styles from "./MovieDetailsStyles.module.css";
import TrailerModal from "../TrailerModal/TrailerModal";
import MovieSites from "./MovieSites";
import Spiner from "../Spiner/Spiner";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { useMovieDetails } from "../../utils/useMovieDetails";
import { formattedDate } from "../../utils/dateConvert";

const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const OMBD_API_KEY = import.meta.env.VITE_OMBD_API_KEY;

export default function MovieDetails() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState(null);
  const [imdbRating, setImdbRating] = useState(null);
  const { id } = useParams();

  const { data: movie, isLoading, error } = useMovieDetails(id);

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/movie/${id}/videos`, {
          params: {
            api_key: API_KEY,
          },
        });
        const trailers = res.data.results;
        const youtubeTrailer = trailers.find(
          (video) => video.site === "YouTube" && video.type === "Trailer"
        );
        if (youtubeTrailer) {
          setTrailerUrl(
            `https://www.youtube.com/embed/${youtubeTrailer.key}?autoplay=1`
          );
        }
      } catch (error) {
        console.error("Error fetching trailer:", error);
      }
    };

    if (id) {
      fetchTrailer();
    }
  }, [id]);

  useEffect(() => {
    const fetchImdbRaiting = async () => {
      if (!movie?.imdb_id) return;

      try {
        const res = await axios.get(`https://www.omdbapi.com/`, {
          params: {
            apikey: OMBD_API_KEY,
            i: movie.imdb_id,
          },
        });

        if (res.data) {
          setImdbRating(res.data);
        }
      } catch (error) {
        console.error("Error fetching imdb score:", error);
      }
    };
    fetchImdbRaiting();
  }, [movie?.imdb_id]);

  if (isLoading) {
    return <Spiner />;
  }

  return (
    <section className={`container`}>
      <TrailerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        trailerUrl={trailerUrl}
      />
      <div className={styles.movieBanner}>
        <div className={styles.mBannerImg}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
            alt="Movie Banner"
          />
        </div>
        <div className={styles.bannerContainer}>
          <div className={styles.titleContainer}>
            <h1>{movie.title}</h1>
            <div className={styles.moreAbout}>
              <div className={styles.raiting}>
                <span>IMDB {imdbRating?.imdbRating}</span>
              </div>
              <div className={styles.metaData}>
                <span>{formattedDate(movie.release_date)}</span>
                <span>{movie.runtime}m</span>
              </div>
            </div>
            <div className={styles.categories}>
              {movie.genres.map((genre) => (
                <a key={genre.id} href="#">
                  {genre.name}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.playButton} onClick={() => setIsModalOpen(true)}>
          <i className="fa-solid fa-circle-play"></i>
        </div>
      </div>
      <div className={styles.movieDetails}>
        <h1>{movie.title}</h1>
        <p>{movie.overview}</p>
        <p>
          <strong>Budget: </strong> ${movie.budget.toLocaleString()}
        </p>
        <p>
          <strong>Distributed by: </strong>
          {movie.production_companies &&
          movie.production_companies.length > 0 ? (
            movie.production_companies.map((company) => (
              <span key={company.id}>
                {company.name}
                {company.id !==
                  movie.production_companies[
                    movie.production_companies.length - 1
                  ].id && ", "}
              </span>
            ))
          ) : (
            <span>Not Available</span>
          )}
        </p>
        <p>
          <strong>IMDb: </strong>
          {imdbRating?.imdbRating} ({imdbRating?.imdbVotes})
        </p>
      </div>

      {/* 3rd party movie sites */}
      <MovieSites title={movie.title} />
    </section>
  );
}
