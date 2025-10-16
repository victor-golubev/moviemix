import styles from "./styles.module.css";
import { useState } from "react";
import useFetch from "../../helpers/hooks/useFetch";
import { Link } from "react-router-dom";
import noPhoto from "../../img/no-photo.jpg";
import MovieSlide from "../MovieSlide/MovieSlide";
import CardMovie from "../CardMovie/CardMovie";

function MaybeSlider({ data }) {
  const [index, setIndex] = useState(0);

  const handlePrev = () =>
    setIndex((prev) => (data && prev <= 0 ? 0 : prev - 1));

  const handleNext = () =>
    setIndex((prev) => (data && prev >= data.length - 4 ? prev : prev + 1));

  return (
    <section className={styles.slider}>
      <div className="container">
        <h3 className={styles.slider_title}>Возможно, вам понравится</h3>

        {data && data.length > 0 && (
          <>
            <div className={styles.sliderContainer}>
              <button
                className={styles.prevButton}
                onClick={handlePrev}
                disabled={!data || index <= 0}
              >
                {"<"}
              </button>

              {data.slice(index, index + 4).map((movie) => (
                <CardMovie movie={movie} key={movie.id} />
              ))}

              <button
                className={styles.nextButton}
                onClick={handleNext}
                disabled={!data || index >= data.length - 2}
              >
                {">"}
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default MaybeSlider;
