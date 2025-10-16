import { useState, useEffect } from "react";
import styles from "./styles.module.css";
import useFetch from "../../helpers/hooks/useFetch";
const API_KEY = import.meta.env.VITE_KINOPOISK_API_KEY;
import { Link } from "react-router-dom";
import CardMovie from "./../CardMovie/CardMovie";
import MoviesFilters from "../MoviesFilters/MoviesFilters";
import Skeleton from "../Skeleton/Skeleton";
import { useLocation } from "react-router-dom";

function MoviesCategories({ limit, page }) {
  const [query, setQuery] = useState(""); // MoviesFilters вернёт сюда готовую строку
  const location = useLocation();
  const { data, isLoading, error } = useFetch({
    endpoint: "movie",
    query,
    limit,
  });

  const movies = data?.docs || [];

  return (
    <section className={styles.tabs}>
      <div className="container">
        <h3 className="section-title">Фильмы по категориям</h3>
        <div className={styles.filtersWrapper}>
          <MoviesFilters onChange={setQuery} />
          {location.pathname === "/" && (
            <Link to={`/categories`} className={styles.see_all}>
              Смотреть все
            </Link>
          )}
        </div>
        <div className={styles.filtered_movies}>
          {isLoading && <Skeleton type="listCard" count={8} />}
          {error && <p>Ошибка: {error.message}</p>}

          {!isLoading && movies && movies.length === 0 && (
            <p>Фильмы не найдены</p>
          )}

          {!isLoading &&
            movies &&
            movies.map((movie) => <CardMovie movie={movie} key={movie.id} />)}
        </div>
      </div>
    </section>
  );
}

export default MoviesCategories;
