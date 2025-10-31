import styles from "./styles.module.css";
import { useState } from "react";
import useFetch from "@/hooks/useFetch";
import { Link } from "react-router-dom";
import noPhoto from "@/assets/img/no-photo.jpg";
import MovieSlide from "@/components/MovieSlide/MovieSlide";
import CardMovie from "@/components/CardMovie/CardMovie";

function RecommendedMoviesSlider({ movies }) {
  const [index, setIndex] = useState(0);

  const handlePrev = () =>
    setIndex((prev) => (movies && prev <= 0 ? 0 : prev - 1));

  const handleNext = () =>
    setIndex((prev) => (movies && prev >= movies.length - 4 ? prev : prev + 1));

  return (
    <section className={styles.slider}>
      <div className="container">
        <h3 className={styles.slider_title}>Возможно, вам понравится</h3>

        {movies && movies.length > 0 && (
          <>
            <div className={styles.sliderContainer}>
              <button
                className={`${styles.prevButton} ${styles.button}`}
                onClick={handlePrev}
                disabled={!movies || index <= 0}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M15 18L9 12L15 6"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {movies.slice(index, index + 4).map((movie) => (
                <CardMovie movie={movie} key={movie.id} />
              ))}

              <button
                className={`${styles.nextButton} ${styles.button}`}
                onClick={handleNext}
                disabled={!movies || index >= movies.length - 2}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M15 18L9 12L15 6"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default RecommendedMoviesSlider;
