import { useState, useEffect } from "react";
import styles from "./styles.module.css";
import useFetch from "../../helpers/hooks/useFetch";
const API_KEY = import.meta.env.VITE_KINOPOISK_API_KEY;
import { Link } from "react-router-dom";
import CardMovie from "./../../components/CardMovie/CardMovie";
import MoviesFilters from "./../../components/MoviesFilters/MoviesFilters";
import Skeleton from "./../../components/Skeleton/Skeleton";
import Pagination from "../../components/Pagination/Pagination";
import MoviesCategories from "../../components/MoviesCategories/MoviesCategories";

function MoviesCategoriesAll() {
  const [query, setQuery] = useState(""); // MoviesFilters вернёт сюда готовую строку
  const [page, setPage] = useState(1);
  const limit = 12;

  // Формируем полный query с пагинацией
  const fullQuery = `query=${encodeURIComponent(
    query
  )}&page=${page}&limit=${limit}`;

  const { data, isLoading, error } = useFetch({
    endpoint: "movie",
    query: fullQuery,
  });

  const movies = data?.docs || [];
  const total = data?.total || 0;
  const pages = data?.pages || 1;

  return (
    <>
      <MoviesCategories limit={limit} page={page} />;
      <Pagination page={page} totalPages={total} setPage={setPage} />
    </>
  );
}

export default MoviesCategoriesAll;
