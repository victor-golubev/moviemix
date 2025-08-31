import styles from "./styles.module.css";
import { useState } from "react";
import movies from "../../helpers/movies";
import MoviesSlider from "../MoviesSlider/MoviesSlider";

function LatestMovies({ movies }) {
  return (
    <section className={styles.slider}>
      <div className="container">
        <h3 className="section-title">Новинки кино</h3>
        <MoviesSlider movies={movies} />
      </div>
    </section>
  );
}

export default LatestMovies;
