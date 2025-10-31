import { useParams } from "react-router-dom";
import useFetch from "@/hooks/useFetch";
import styles from "./styles.module.css";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import CardMovie from "@/components/CardMovie/CardMovie";
import { useState, useEffect } from "react";
import Skeleton from "@/components/Skeleton/Skeleton";
import Pagination from "@/components/Pagination/Pagination";
import { ERROR_MESSAGES } from "@/constants/messages";

function SearchResultsPage() {
  const { query } = useParams();
  const [page, setPage] = useState(1);
  const limit = 12;

  const fullQuery = `query=${encodeURIComponent(
    query
  )}&page=${page}&limit=${limit}`;
  const { data, isLoading, error } = useFetch({
    endpoint: "movie/search",
    query: fullQuery,
  });

  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (data?.pages) setTotalPages(data.pages);
    else if (data?.total) setTotalPages(Math.ceil(data.total / limit));
  }, [data, limit]);

  const movies = data?.docs || [];

  return (
    <div className="container">
      <Breadcrumbs />
      <h2 className={styles.title}>Результаты поиска: "{query}"</h2>

      {error && <p className="error">{ERROR_MESSAGES.default}</p>}
      <div className={styles.list}>
        {(isLoading || !data?.docs) && !error && (
          <Skeleton type="listCard" count={12} />
        )}

        {data?.docs && data.docs.length === 0 && <p>Ничего не найдено</p>}

        {data?.docs &&
          data.docs.length > 0 &&
          data.docs.map((movie) => <CardMovie movie={movie} key={movie.id} />)}
      </div>

      {!isLoading && totalPages > 1 && (
        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      )}
    </div>
  );
}

export default SearchResultsPage;
