import { useState, useEffect } from "react";
import styles from "./styles.module.css";
import useFetch from "../../helpers/hooks/useFetch";
const API_KEY = import.meta.env.VITE_KINOPOISK_API_KEY;
import noPhoto from "../../img/no-photo.jpg";

function MoviesCategories() {
  const [genre, setGenre] = useState("");
  const [country, setCountry] = useState("");
  const [year, setYear] = useState("");
  const [rating, setRating] = useState("");

  const [moviesData, setMoviesData] = useState([]);
  const [moviesPosters, setMoviesPosters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      const queryParams = [];
      if (genre) queryParams.push(`genres.name=${genre}`);
      if (country) queryParams.push(`countries.name=${country}`);
      if (year) queryParams.push(`year=${year}`);
      if (rating) queryParams.push(`rating.imdb=${rating}`);

      const query = queryParams.join("&");
      const url = `https://api.kinopoisk.dev/v1.4/movie?limit=8&${query}`;

      setIsLoading(true);
      setError(null);

      try {
        const res = await fetch(url, {
          headers: {
            "X-API-KEY": API_KEY,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error(`Ошибка запроса: ${res.status}`);

        const data = await res.json();
        setMoviesData(data.docs || []);
      } catch (err) {
        setError(err.message || "Что-то пошло не так");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [genre, country, year, rating]);

  return (
    <section className={styles.tabs}>
      <div className="container">
        <h3 className="section-title">Фильмы по категориям</h3>
        <div className={styles.filters}>
          <div className={styles.selectWrapper}>
            <select value={genre} onChange={(e) => setGenre(e.target.value)}>
              <option value="" disabled hidden>
                Жанр
              </option>
              <option value="драма">Драма</option>
              <option value="комедия">Комедия</option>
              <option value="ужасы">Ужасы</option>
              <option value="триллер">Триллер</option>
              <option value="боевик">Боевик</option>
              <option value="фантастика">Фантастика</option>
              <option value="фэнтези">Фэнтези</option>
              <option value="мелодрама">Мелодрама</option>
              <option value="детектив">детектив</option>
              <option value="приключения">Приключения</option>
              <option value="документальный">Документальный</option>
              <option value="анимация">Анимация</option>
              <option value="семейный">Семейный</option>
              <option value="мюзикл">Мюзикл</option>
              <option value="криминал">Криминал</option>
              <option value="военный">военный</option>
              <option value="спорт">Спорт</option>
              <option value="биография">Биография</option>
              <option value="короткометражка">Короткометражка</option>
            </select>
          </div>

          <div className={styles.selectWrapper}>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="" disabled hidden>
                Страна
              </option>
              <option value="США">США</option>
              <option value="Россия">Россия</option>
              <option value="СССР">СССР</option>
              <option value="Великобритания">Великобритания</option>
              <option value="Франция">Франция</option>
              <option value="Германия">Германия</option>
              <option value="Италия">Италия</option>
              <option value="Испания">Испания</option>
              <option value="Индия">Индия</option>
              <option value="Китай">Китай</option>
              <option value="Япония">Япония</option>
            </select>
          </div>

          <div className={styles.selectWrapper}>
            <select value={year} onChange={(e) => setYear(e.target.value)}>
              <option value="" disabled hidden>
                Год
              </option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
              <option value="2019">2019</option>
              <option value="2018">2018</option>
              <option value="2017">2017</option>
              <option value="2016">2016</option>
              <option value="2015">2015</option>
              <option value="2014">2014</option>
              <option value="2013">2013</option>
              <option value="2012">2012</option>
              <option value="2011">2011</option>
              <option value="2010">2010</option>
              <option value="2009">2009</option>
              <option value="2008">2008</option>
              <option value="2007">2007</option>
              <option value="2006">2006</option>
              <option value="2005">2005</option>
              <option value="2004">2004</option>
              <option value="2003">2003</option>
              <option value="2002">2002</option>
              <option value="2001">2001</option>
              <option value="2000">2000</option>
              <option value="1999">1999</option>
              <option value="1998">1998</option>
              <option value="1997">1997</option>
              <option value="1996">1996</option>
              <option value="1995">1995</option>
              <option value="1994">1994</option>
              <option value="1993">1993</option>
              <option value="1992">1992</option>
              <option value="1991">1991</option>
              <option value="1990">1990</option>
              <option value="1989">1989</option>
              <option value="1988">1988</option>
              <option value="1987">1987</option>
              <option value="1986">1986</option>
              <option value="1985">1985</option>
              <option value="1984">1984</option>
              <option value="1983">1983</option>
              <option value="1982">1982</option>
              <option value="1981">1981</option>
              <option value="1980">1980</option>
            </select>
          </div>

          <div className={styles.selectWrapper}>
            <select value={rating} onChange={(e) => setRating(e.target.value)}>
              <option value="" disabled hidden>
                Рейтинг
              </option>
              <option value="9-10">от 9</option>
              <option value="8-10">от 8</option>
              <option value="7-10">от 7</option>
              <option value="6-10">от 6</option>
              <option value="5-10">от 5</option>
              <option value="4-10">от 4</option>
              <option value="3-10">от 3</option>
              <option value="2-10">от 2</option>
              <option value="1-10">от 1</option>
            </select>
          </div>
        </div>
        <div className={styles.filtered_movies}>
          {moviesData?.map((movie) => (
            <div key={movie.id} className={styles.item}>
              <div className={styles.poster}>
                <img
                  src={
                    movie.poster?.previewUrl ? movie.poster.previewUrl : noPhoto
                  }
                  alt={movie.name || movie.alternativeName}
                />
              </div>
              <div className={styles.name}>
                {movie.name || movie.alternativeName}
              </div>
              <div className={styles.info}>
                <div className={styles.info_year}>{movie.year}</div>
                <div className={styles.info_rating}>
                  {movie.rating.imdb > 0 ? movie.rating.imdb : "--"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default MoviesCategories;
