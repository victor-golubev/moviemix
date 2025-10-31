import { useParams } from "react-router-dom";
import useFetch from "@/hooks/useFetch";
import noPhoto from "@/assets/img/no-photo.jpg";
import styles from "./styles.module.css";
import { useNavigate, Link } from "react-router-dom";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import CardMovie from "@/components/CardMovie/CardMovie";
import RecommendedMoviesSlider from "@/components/RecommendedMoviesSlider/RecommendedMoviesSlider";

function MovieDetails({ movie }) {
  return (
    <div className="container">
      <Breadcrumbs />
      <div className={styles.details}>
        <div className={styles.poster}>
          <img
            src={movie.poster?.previewUrl || noPhoto}
            alt={movie.name || movie.alternativeName}
          />
        </div>
        <div className={styles.info}>
          <h1 className={styles.movie_title}>
            {movie.name || movie.alternativeName}
          </h1>
          <p className={styles.description}>
            {movie.description || "Нет описания"}
          </p>
          <h3 className={styles.about_title}>О фильме</h3>
          <table>
            <tbody>
              <tr>
                <td>
                  <strong>Название:</strong>
                </td>
                <td>{movie.name || movie.alternativeName || "—"}</td>
              </tr>
              <tr>
                <td>
                  <strong>Жанр:</strong>
                </td>
                <td>
                  {movie.genres?.map((genre) => genre.name).join(", ") || "—"}
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Страна:</strong>
                </td>
                <td>
                  {movie.countries?.map((country) => country.name).join(", ") ||
                    "—"}
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Год:</strong>
                </td>
                <td>{movie.year || "—"}</td>
              </tr>
              <tr>
                <td>
                  <strong>Режиссёр:</strong>
                </td>
                <td>
                  {movie.persons
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
                  {movie.persons
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
                  {movie.budget?.value
                    ? `${movie.budget.value.toLocaleString()} ${
                        movie.budget.currency
                      }`
                    : "—"}
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Длительность:</strong>
                </td>
                <td>{movie.movieLength ? `${movie.movieLength} мин.` : "—"}</td>
              </tr>
              <tr>
                <td>
                  <strong>Слоган:</strong>
                </td>
                <td>{movie.slogan || "—"}</td>
              </tr>
              <tr>
                <td>
                  <strong>Рейтинг IMDb / KP:</strong>
                </td>
                <td>
                  {movie.rating
                    ? `${movie.rating.imdb || "--"} / ${
                        movie.rating.kp || "--"
                      }`
                    : "—"}
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Дата премьеры (Россия):</strong>
                </td>
                <td>
                  {movie.premiere?.russia
                    ? new Date(movie.premiere.russia).toLocaleDateString()
                    : "—"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {movie.similarMovies?.length > 0 && (
        <RecommendedMoviesSlider movies={movie.similarMovies} />
      )}
    </div>
  );
}

export default MovieDetails;
