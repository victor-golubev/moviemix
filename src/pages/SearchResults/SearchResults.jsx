import { useParams } from "react-router-dom";
import useFetch from "../../helpers/hooks/useFetch";
import styles from "./styles.module.css";
import noPhoto from "../../img/no-photo.jpg";
import { useNavigate, Link } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import CardMovie from "./../../components/CardMovie/CardMovie";
import { useState, useEffect } from "react";
import Skeleton from "../../components/Skeleton/Skeleton";
import Pagination from "./../../components/Pagination/Pagination";

function SearchResults() {
  const [page, setPage] = useState(1);
  const [limit] = useState(8); // Лимит на странице
  const [totalPages, setTotalPages] = useState(1);

  const { query } = useParams();

  // Формируем полный query с пагинацией
  const fullQuery = `query=${encodeURIComponent(
    query
  )}&page=${page}&limit=${limit}`;

  const { data, isLoading, error } = useFetch({
    endpoint: "movie/search",
    query: fullQuery,
  });

  console.log(data);

  // Обновляем totalPages, когда приходят данные
  useEffect(() => {
    if (data?.pages) {
      setTotalPages(data.pages);
    } else if (data?.total) {
      // Если API не возвращает pages, можно вычислить вручную, если известно total
      // Например: Math.ceil(total / limit)
      // Здесь предположим, что API возвращает `total` и `limit`

      setTotalPages(Math.ceil(data.total / limit));
    }
  }, [data, limit]);

  // Обработчики для пагинации
  const handlePrevClick = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNextClick = () =>
    setPage((prev) => Math.min(prev + 1, totalPages));
  const handlePageClick = (num) => setPage(num);

  const getVisiblePages = () => {
    const visiblePages = 5; // Максимальное количество отображаемых кнопок
    const startPage = Math.max(1, page - Math.floor(visiblePages / 2));
    const endPage = Math.min(totalPages, startPage + visiblePages - 1);

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;
  if (!data.docs?.length) return <p>Ничего не найдено</p>;

  return (
    <div className="container">
      <Breadcrumbs />
      {isLoading && <Skeleton type="listCard" count={10} />}

      {error && <p>Ошибка: {error}</p>}

      {!data.docs?.length && !error && <p>Ничего не найдено</p>}

      <h2 className={styles.title}>Результаты поиска: "{query}"</h2>
      <div className={styles.list}>
        {data.docs.map((movie) => (
          <CardMovie movie={movie} key={movie.id} />
        ))}
      </div>
      {totalPages > 1 && (
        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      )}
    </div>
  );
}

export default SearchResults;
