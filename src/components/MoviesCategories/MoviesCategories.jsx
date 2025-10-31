import { useState, useEffect } from "react";
import styles from "./styles.module.css";
import useFetch from "@/hooks/useFetch";
import { Link, useLocation } from "react-router-dom";
import CardMovie from "@/components/CardMovie/CardMovie";
import MoviesFiltersPanel from "@/components/MoviesFiltersPanel/MoviesFiltersPanel";
import Skeleton from "@/components/Skeleton/Skeleton";

function MoviesCategories({ limit, page = 1 }) {
  const [query, setQuery] = useState("year=2025-2025");
  const location = useLocation();

  const { data, isLoading, error } = useFetch({
    endpoint: "movie",
    query: `${
      query ? query : "type=movie&year=2024&sortField=rating.kp&sortType=-1"
    }&limit=${limit}&page=${page}`,
  });

  const movies = data?.docs || [];
  const totalPages = data?.pages || 1;

  return (
    <section className={styles.tabs}>
      <div className="container">
        <h3 className="section-title">Фильмы по категориям</h3>

        <div className={styles.filtersWrapper}>
          <MoviesFiltersPanel onChange={setQuery} />
          {location.pathname === "/" && (
            <Link to="/categories" className="show_all">
              Смотреть все
            </Link>
          )}
        </div>

        {error && <p className="error">{error.message}</p>}
        <div className={styles.filtered_movies}>
          {isLoading && <Skeleton type="listCard" count={8} />}

          {!isLoading && !error && movies.length === 0 && (
            <p>Фильмы не найдены</p>
          )}

          {!isLoading &&
            movies.map((movie) => <CardMovie movie={movie} key={movie.id} />)}
        </div>
      </div>
    </section>
  );
}

export default MoviesCategories;
