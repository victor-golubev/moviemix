import { useParams } from "react-router-dom";
import useFetch from "../../helpers/hooks/useFetch";
import noPhoto from "../../img/no-photo.jpg";
import styles from "./styles.module.css";
import { useNavigate, Link } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import CardMovie from "./../../components/CardMovie/CardMovie";
import MaybeSlider from "../../components/MaybeSlider/MaybeSlider";

function MovieDetails() {
  const { id } = useParams();

  const { data, isLoading, error } = useFetch({
    endpoint: `movie/${id}`,
  });

  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error.message}</p>;
  if (!data) return <p>Фильм не найден</p>;

  return (
    <div className="container">
      <Breadcrumbs />
      <div className={styles.details}>
        <div className={styles.poster}>
          <img
            src={data.poster?.previewUrl || noPhoto}
            alt={data.name || data.alternativeName}
          />
        </div>
        <div className={styles.info}>
          <h1 className={styles.movie_title}>
            {data.name || data.alternativeName}
          </h1>
          <p className={styles.description}>
            {data.description || "Нет описания"}
          </p>
          <h3 className={styles.about_title}>О фильме</h3>
          <table>
            <tbody>
              <tr>
                <td>
                  <strong>Название:</strong>
                </td>
                <td>{data.name || data.alternativeName || "—"}</td>
              </tr>
              <tr>
                <td>
                  <strong>Жанр:</strong>
                </td>
                <td>
                  {data.genres?.map((genre) => genre.name).join(", ") || "—"}
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Страна:</strong>
                </td>
                <td>
                  {data.countries?.map((country) => country.name).join(", ") ||
                    "—"}
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Год:</strong>
                </td>
                <td>{data.year || "—"}</td>
              </tr>
              <tr>
                <td>
                  <strong>Режиссёр:</strong>
                </td>
                <td>
                  {data.persons
                    ?.filter((p) => p.enProfession === "director")
                    .map((p) => p.name || p.enName)
                    .join(", ") || "—"}
                </td>
              </tr>
              <tr>
                <td>
                  <strong>В главных ролях:</strong>
                </td>
                <td>
                  {data.persons
                    ?.filter((p) => p.enProfession === "actor")
                    .slice(0, 5)
                    .map((p) => p.name || p.enName)
                    .join(", ") || "—"}
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Бюджет:</strong>
                </td>
                <td>
                  {data.budget?.value
                    ? `${data.budget.value.toLocaleString()} ${
                        data.budget.currency
                      }`
                    : "—"}
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Длительность:</strong>
                </td>
                <td>{data.movieLength ? `${data.movieLength} мин.` : "—"}</td>
              </tr>
              <tr>
                <td>
                  <strong>Слоган:</strong>
                </td>
                <td>{data.slogan || "—"}</td>
              </tr>
              <tr>
                <td>
                  <strong>Рейтинг IMDb / KP:</strong>
                </td>
                <td>
                  {data.rating
                    ? `${data.rating.imdb || "--"} / ${data.rating.kp || "--"}`
                    : "—"}
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Дата премьеры (Россия):</strong>
                </td>
                <td>
                  {data.premiere?.russia
                    ? new Date(data.premiere.russia).toLocaleDateString()
                    : "—"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {data.similarMovies && <MaybeSlider data={data.similarMovies} />}
    </div>
  );
}

export default MovieDetails;
