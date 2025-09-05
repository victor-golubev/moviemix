import { useParams } from "react-router-dom";
import useFetch from "../../helpers/hooks/useFetch";
import styles from "./styles.module.css";
import noPhoto from "../../img/no-photo.jpg";
import { useNavigate, Link } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import CardMovie from "./../../components/CardMovie/CardMovie";

function SearchResults() {
  const { query } = useParams();

  const { data, isLoading, error } = useFetch({
    endpoint: "movie/search",
    query: `query=${query}`,
  });

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
    </div>
  );
}

export default SearchResults;
