import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import noPhoto from "../../img/no-photo.jpg";

function MovieSlide({ movie }) {
  return (
    <div className={styles.slide} key={movie.id}>
      <div className={styles.slideInfo}>
        <div className={styles.movieTitle}>
          {movie.name || movie.alternativeName}
        </div>
        <div className={styles.movieGenres}>
          {movie.genres?.map((genre) => (
            <div className={styles.movieGenre} key={genre.name}>
              {genre.name}
            </div>
          ))}
        </div>

        <div className={styles.movieInfo}>
          {movie.description
            ? movie.description.length > 200
              ? movie.description.slice(0, 200) + "..."
              : movie.description
            : "Описание отсутствует"}
        </div>

        <Link to={`/movie/${movie.id}`} className={styles.movieWatchBtn}>
          Смотреть
        </Link>
      </div>
      <Link
        to={`/movie/${movie.id}`}
        className={styles.moviePoster}
        style={{
          backgroundImage: `url(${movie.poster?.previewUrl || noPhoto})`,
        }}
      ></Link>
    </div>
  );
}

export default MovieSlide;
