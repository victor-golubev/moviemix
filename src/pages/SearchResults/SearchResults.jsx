import { useParams } from "react-router-dom";
import useFetch from "../../helpers/hooks/useFetch";
import styles from "./styles.module.css";
import noPhoto from "../../img/no-photo.jpg";
import { useNavigate, Link } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import CardMovie from "./../../components/CardMovie/CardMovie";
import { useState, useEffect } from "react";

function SearchResults() {
  const [page, setPage] = useState(1);
  const [limit] = useState(12); // Лимит на странице
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
    let pages = [];
    for (let i = 1; i <= totalPages; i++) pages.push(i);
    return pages;
  };

  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;
  if (!data?.length) return <p>Ничего не найдено</p>;

  return (
    <div className="container">
      <Breadcrumbs />
      <h2 className={styles.title}>Результаты поиска: "{query}"</h2>
      <div className={styles.list}>
        {data.map((movie) => (
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
  );
}

export default SearchResults;
