import { useState } from "react";
import TrailerModal from "../TrailerModal/TrailerModal";
import styles from "./MovieDetailsStyles.module.css";

import { sites } from "../../data/movieSites.json";
import { Link } from "react-router-dom";
import MovieSites from "./MovieSites";

export default function MovieDetails() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className={`container`}>
      <TrailerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <div className={styles.movieBanner}>
        <div className={styles.mBannerImg}>
          <img
            src="https://theconsultingdetectivesblog.com/wp-content/uploads/2014/06/the-dark-knight-original.jpg"
            alt=""
          />
        </div>
        <div className={styles.bannerContainer}>
          <div className={styles.titleContainer}>
            <h1>The Dark Knight</h1>
            <div className={styles.moreAbout}>
              <div className={styles.raiting}>
                <span>IMDB 9.0</span>
              </div>
              <div className={styles.metaData}>
                <span>17 July 2008</span>
                <span>2h 32m</span>
              </div>
            </div>
            <div className={styles.categories}>
              <a href="">Action</a>
              <a href="">Crime</a>
            </div>
          </div>
        </div>
        <div className={styles.playButton} onClick={() => setIsModalOpen(true)}>
          <i className="fa-solid fa-circle-play"></i>
        </div>
      </div>
      <div className={styles.movieDetails}>
        <h1>The Dark Knight</h1>
        <p>
          Batman has a new foe, the Joker, who is an accomplished criminal
          hell-bent on decimating Gotham City. Together with Gordon and Harvey
          Dent, Batman struggles to thwart the Joker before it is too late.
        </p>
        <p>
          <strong>Director: </strong> Christopher Nolan
        </p>
        <p>
          <strong>Budget: </strong> 180 million USD, 185 million USD
        </p>
        <p>
          <strong>Distributed by: </strong> Warner Bros., Warner Bros. Pictures,
          FilmFlex
        </p>
        <p>
          <strong>IMDb: </strong> 9/10 (3,004,530)
        </p>
      </div>

      {/* 3th part movie sites */}
      <MovieSites />
    </section>
  );
}
