import styles from "./styles.module.css";
import useSliderMovies from "@/hooks/useSliderMovies";
import MovieSlide from "@/components/MovieSlide/MovieSlide";
import Skeleton from "@/components/Skeleton/Skeleton";

export default function Slider() {
  const { movies, isLoading, error, index, handlePrev, handleNext, maxIndex } =
    useSliderMovies();

  return (
    <section className={styles.slider}>
      <div className="container">
        <h2 className="section-title">Новинки кино</h2>

        {error ? (
          <div className="error">{error.message}</div>
        ) : (
          <div className={styles.sliderContainer}>
            <button
              className={`${styles.prevButton} ${styles.button}`}
              onClick={handlePrev}
              disabled={isLoading || index <= 0}
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

            {!isLoading ? (
              <Skeleton type="sliderCard" count={2} />
            ) : (
              movies
                .slice(index, index + 2)
                .map((movie) => <MovieSlide key={movie.id} movie={movie} />)
            )}

            <button
              className={`${styles.nextButton} ${styles.button}`}
              onClick={handleNext}
              disabled={isLoading || index >= maxIndex}
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
        )}
      </div>
    </section>
  );
}
