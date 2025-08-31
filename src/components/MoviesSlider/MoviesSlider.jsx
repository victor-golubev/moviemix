import styles from "./styles.module.css";
import { useState } from "react";

function MoviesSlider({ movies = [] }) {
  const [index, setIndex] = useState(0);

  const handlePrev = () => setIndex((prev) => (prev <= 0 ? 0 : prev - 1));
  const handleNext = () =>
    setIndex((prev) => (prev >= movies.length - 2 ? prev : prev + 1));

  const handleWatch = () => {};

  return (
    <div className={styles.slider}>
      <button
        className={styles.prev_button}
        onClick={handlePrev}
        disabled={index === 0}
      >
        {"<"}
      </button>

      {movies.slice(index, index + 2).map((movie) => (
        <div className={styles.slide} key={movie.id}>
          <div className={styles.slide_info}>
            <div className={styles.movie_title}>
              {movie.name || movie.alternativeName}
            </div>
            <div className={styles.movie_genres}>
              {movie.genres?.map((genre) => (
                <div className={styles.movie_genre} key={genre.name}>
                  {genre.name}
                </div>
              ))}
            </div>
            <div className={styles.movie_info}>
              {movie.description?.length > 200
                ? movie.description.slice(0, 200) + "..."
                : movie.description}
            </div>
            <button className={styles.movie_watch_btn} onClick={handleWatch}>
              Смотреть
            </button>
          </div>
          <div
            className={styles.movie_poster}
            style={{
              backgroundImage: `url(${movie.poster?.previewUrl || ""})`,
            }}
          ></div>
        </div>
      ))}

      <button
        className={styles.next_button}
        onClick={handleNext}
        disabled={index >= movies.length - 2}
      >
        {">"}
      </button>
    </div>
  );
}

export default MoviesSlider;
