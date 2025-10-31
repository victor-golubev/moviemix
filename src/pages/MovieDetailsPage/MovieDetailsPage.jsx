import { useParams } from "react-router-dom";
import useFetch from "@/hooks/useFetch";
import noPhoto from "@/assets/img/no-photo.jpg";
import styles from "./styles.module.css";
import { useNavigate, Link } from "react-router-dom";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import CardMovie from "@/components/CardMovie/CardMovie";
import RecommendedMoviesSlider from "@/components/RecommendedMoviesSlider/RecommendedMoviesSlider";
import MovieDetails from "@/components/MovieDetails/MovieDetails";

function MovieDetailsPage() {
  const { id } = useParams();

  const { data, isLoading, error } = useFetch({
    endpoint: `movie/${id}`,
  });

  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error.message}</p>;
  if (!data) return <p>Фильм не найден</p>;

  return <MovieDetails movie={data} />;
}

export default MovieDetailsPage;
