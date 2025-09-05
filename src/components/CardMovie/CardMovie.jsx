import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import noPhoto from "../../img/no-photo.jpg";

function CardMovie({ movie }) {
  return (
    <Link to={`/movie/${movie.id}`} className={styles.movie} key={movie.id}>
      <div className={styles.poster}>
        <img
          src={movie.poster?.previewUrl || noPhoto}
          alt={`Постер фильма ${movie.name || movie.alternativeName}`}
        />
      </div>
      <h4 className={styles.name}>{movie.name || movie.alternativeName}</h4>
      <div className={styles.info}>
        <div className={styles.year}>{movie.year || "--"}</div>
        <div className={styles.rating}>
          {movie.rating?.imdb > 0 ? movie.rating.imdb : "--"}
        </div>
      </div>
    </Link>
  );
}

export default CardMovie;
