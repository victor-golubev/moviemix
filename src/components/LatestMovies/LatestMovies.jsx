import styles from "./styles.module.css";
import { useState } from "react";
import movies from "../../helpers/movies";
import MovieSlider from "../MovieSlider/MovieSlider";

function LatestMovies() {
  return (
    <section className={styles.slider}>
      <div className="container">
        <MovieSlider movies={movies} />
      </div>
    </section>
  );
}

export default LatestMovies;
