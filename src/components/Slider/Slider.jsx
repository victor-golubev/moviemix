import styles from "./styles.module.css";
import { useState } from "react";
import useFetch from "../../helpers/hooks/useFetch";
import { Link } from "react-router-dom";
import noPhoto from "../../img/no-photo.jpg";
import MovieSlide from "../MovieSlide/MovieSlide";
import Skeleton from "../Skeleton/Skeleton";

function Slider() {
  const { data, isLoading, error } = useFetch({
    endpoint: "movie",
    query: "field=year&search=2025-2025",
  });

  const movies = data?.docs || [];

  const [index, setIndex] = useState(0);

  const handlePrev = () => setIndex((prev) => (prev <= 0 ? 0 : prev - 1));
  const handleNext = () =>
    setIndex((prev) => (data && prev >= data.length - 2 ? prev : prev + 1));

  return (
    <section className={styles.slider}>
      <div className="container">
        <h3 className="section-title">Новинки кино</h3>

        {error && <div>Ошибка загрузки...</div>}

        <div className={styles.sliderContainer}>
          <button
            className={styles.prevButton}
            onClick={handlePrev}
            disabled={isLoading || index <= 0}
          >
            {"<"}
          </button>

          {isLoading ? (
            <Skeleton type="sliderCard" count={2} />
          ) : (
            movies &&
            movies.length > 0 &&
            movies
              .slice(index, index + 2)
              .map((movie) => <MovieSlide movie={movie} key={movie.id} />)
          )}

          <button
            className={styles.nextButton}
            onClick={handleNext}
            disabled={isLoading || !movies || index >= movies.length - 2}
          >
            {">"}
          </button>
        </div>
      </div>
    </section>
  );
}

export default Slider;
