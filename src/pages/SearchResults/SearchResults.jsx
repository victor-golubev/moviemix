import { useParams } from "react-router-dom";
import useFetch from "../../helpers/hooks/useFetch";
import styles from "./styles.module.css";
import noPhoto from "../../img/no-photo.jpg";
import { useNavigate, Link } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import CardMovie from "./../../components/CardMovie/CardMovie";
import Skeleton from "../../components/Skeleton/Skeleton";

function SearchResults() {
  const { query } = useParams();

  const { data, isLoading, error } = useFetch({
    endpoint: "movie/search",
    query: `query=${query}`,
  });

  return (
    <div className="container">
      <Breadcrumbs />
      {isLoading && <Skeleton type="listCard" count={10} />}

      {error && <p>Ошибка: {error}</p>}

      {!data?.length && !error && <p>Ничего не найдено</p>}

      <h2 className={styles.title}>Результаты поиска: "{query}"</h2>
      <div className={styles.list}>
        {data.map((movie) => (
          <CardMovie movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
}

export default SearchResults;
