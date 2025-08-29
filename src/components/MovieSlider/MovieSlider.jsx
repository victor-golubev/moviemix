import styles from "./styles.module.css";
import { useState } from "react";

function MovieSlider({ movies }) {
  const [index, setIndex] = useState(1);
  const handlePrev = () => {
    setIndex((prev) => (prev === 0 ? 0 : prev - 1));
  };
  const handleNext = () => {
    setIndex((prev) => (prev === movies.length - 1 ? prev : prev + 1));
  };

  return (
    <div className={styles.slider}>
      <h2 className={styles.slider_title}>Новинки кино</h2>
      <button
        className={styles.prev_button}
        onClick={handlePrev}
        disabled={index === 0}
      >
        {"<"}
      </button>
      {movies.map(
        (movie, i) =>
          i === index && (
            <div className={styles.slide} key={movie.key}>
              <div className={styles.slide_info}>
                <div className={styles.movie_title}>{movie.name}</div>
                <div className={styles.movie_info}>{movie.info}</div>
              </div>
              <div
                className={styles.movie_poster}
                style={{ backgroundImage: `url(${movie.poster})` }}
              ></div>
            </div>
          )
      )}
      <button
        className={styles.next_button}
        onClick={handleNext}
        disabled={index === movies.length - 1}
      >
        {">"}
      </button>
    </div>
  );
}

export default MovieSlider;
