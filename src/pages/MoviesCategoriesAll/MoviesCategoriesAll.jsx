import { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import CardMovie from "../../components/CardMovie/CardMovie";
import MoviesFilters from "../../components/MoviesFilters/MoviesFilters";
import Pagination from "../../components/Pagination/Pagination";
import useFetch from "../../helpers/hooks/useFetch"; // ⚠️ ДОБАВЛЕН ИМПОРТ

const API_KEY = import.meta.env.VITE_KINOPOISK_API_KEY;

function MoviesCategoriesAll() {
  const [query, setQuery] = useState(""); // MoviesFilters вернёт сюда готовую строку
  const [page, setPage] = useState(1);
  const [limit] = useState(12); // Лимит на странице
  const [totalPages, setTotalPages] = useState(1);

  // Формируем полный query с пагинацией
  const fullQuery = query
    ? `${query}&page=${page}&limit=${limit}`
    : `page=${page}&limit=${limit}`;

  const {
    data: moviesData,
    isLoading,
    error,
  } = useFetch({
    endpoint: "movie",
    query: fullQuery, // ✅ Передаём page и limit в запрос
  });

  // Обновляем totalPages, когда приходят данные
  useEffect(() => {
    if (moviesData?.pages) {
      setTotalPages(moviesData.pages);
    } else if (moviesData?.docs) {
      // Если API не возвращает pages, можно вычислить вручную, если известно total
      // Например: Math.ceil(total / limit)
      // Здесь предположим, что API возвращает `total` и `limit`
      const total = moviesData.total || 0;
      setTotalPages(Math.ceil(total / limit));
    }
  }, [moviesData, limit]);

  const handlePageClick = (pageNumber) => setPage(pageNumber);
  const handlePrevClick = () => page > 1 && setPage(page - 1);
  const handleNextClick = () => page < totalPages && setPage(page + 1);

  const getVisiblePages = () => {
    const visiblePages = 5;
    const startPage = Math.max(1, page - Math.floor(visiblePages / 2));
    const endPage = Math.min(totalPages, startPage + visiblePages - 1);
    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  return (
    <section className={styles.tabs}>
      <div className="container">
        <h3 className="section-title">Что посмотреть</h3>

        <div className={styles.filtersWrapper}>
          <MoviesFilters onChange={setQuery} />
        </div>

        <div className={styles.filtered_movies_wrap}>
          <div className={styles.filtered_movies}>
            {isLoading && <p>Загрузка...</p>}
            {error && <p>Ошибка: {error.message || error}</p>}
            {!isLoading &&
              !error &&
              (!moviesData?.docs || moviesData.docs.length === 0) && (
                <p>Нет данных для отображения</p>
              )}

            {!isLoading &&
              !error &&
              moviesData?.docs?.map((movie) => (
                <CardMovie movie={movie} key={movie.id} />
              ))}
          </div>

          {totalPages > 1 && (
            <Pagination
              page={page}
              totalPages={totalPages}
              handlePrevClick={handlePrevClick}
              handleNextClick={handleNextClick}
              handlePageClick={handlePageClick}
              getVisiblePages={getVisiblePages}
            />
          )}
        </div>
      </div>
    </section>
  );
}

export default MoviesCategoriesAll;
