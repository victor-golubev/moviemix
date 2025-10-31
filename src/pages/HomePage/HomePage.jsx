import Slider from "@/components/Slider/Slider";
import MoviesTabs from "@/components/MoviesTabs/MoviesTabs";
import MoviesCategories from "@/components/MoviesCategories/MoviesCategories";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

export default function HomePage() {
  return (
    <>
      <Slider />
      <MoviesTabs showPagination={false} limit={8} showAll={true} />
      <MoviesCategories limit={8} />
    </>
  );
}
