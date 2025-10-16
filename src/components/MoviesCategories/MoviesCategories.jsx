import { useState, useEffect } from "react";
import styles from "./styles.module.css";
import useFetch from "../../helpers/hooks/useFetch";
const API_KEY = import.meta.env.VITE_KINOPOISK_API_KEY;
import { Link } from "react-router-dom";
import CardMovie from "./../CardMovie/CardMovie";
import MoviesFilters from "../MoviesFilters/MoviesFilters";
import Skeleton from "../Skeleton/Skeleton";

function MoviesCategories() {
  const [query, setQuery] = useState(""); // MoviesFilters вернёт сюда готовую строку

  const {
    data: moviesData,
    isLoading,
    error,
  } = useFetch({
    endpoint: "movie",
    query,
  });

  return (
    <section className={styles.tabs}>
      <div className="container">
        <h3 className="section-title">Фильмы по категориям</h3>
        <div className={styles.filtersWrapper}>
          <MoviesFilters onChange={setQuery} />
          <Link to={`/categories`} className={styles.see_all}>
            Смотреть все
          </Link>
        </div>
        <div className={styles.filtered_movies}>
          {isLoading && <Skeleton type="listCard" count={8} />}
          {error && <p>Ошибка: {error.message}</p>}

          {!isLoading && moviesData && moviesData.length === 0 && (
            <p>Фильмы не найдены</p>
          )}

          {!isLoading &&
            moviesData &&
            moviesData.map((movie) => (
              <CardMovie movie={movie} key={movie.id} />
            ))}
        </div>
      </div>
    </section>
  );
}

export default MoviesCategories;
