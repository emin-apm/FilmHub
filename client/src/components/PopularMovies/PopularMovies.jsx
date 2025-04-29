import { useEffect, useRef } from "react";
import styles from "./PopularMoviesStyles.module.css";
import MovieCard from "../MovieCard/MovieCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function PopularMovies({ title, movies }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.params.navigation.prevEl = prevRef.current;
      swiperRef.current.swiper.params.navigation.nextEl = nextRef.current;
      swiperRef.current.swiper.navigation.init();
      swiperRef.current.swiper.navigation.update();
    }
  }, []);

  return (
    <section className={`${styles.popular} container`}>
      <div className={styles.heading}>
        <h2 className={styles.headingTitle}>{title}</h2>
        <div className={styles.arrows}>
          <i className="fa-solid fa-chevron-left" ref={prevRef}></i>
          <i className="fa-solid fa-chevron-right" ref={nextRef}></i>
        </div>
      </div>

      <Swiper
        ref={swiperRef}
        modules={[Navigation, Autoplay]}
        loop={movies?.length > 5}
        navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
        autoplay={{ delay: 3000 }}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 10 },
          640: { slidesPerView: 3, spaceBetween: 15 },
          1024: { slidesPerView: 4, spaceBetween: 20 },
          1440: { slidesPerView: 5, spaceBetween: 25 },
        }}
      >
        {movies?.map((movie, index) => (
          <SwiperSlide key={index} className={styles.swiper_slide}>
            <MovieCard movie={movie} />{" "}
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
