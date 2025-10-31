import { useState, useEffect } from "react";
import styles from "./styles.module.css";
import useFetch from "@/hooks/useFetch";

function MoviesFiltersPanel({ onChange }) {
  const [filters, setFilters] = useState({
    genre: "",
    country: "",
    year: "",
    rating: "",
  });

  const { data: genres = [] } = useFetch({
    endpoint: "movie/possible-values-by-field",
    query: "field=genres.name",
    version: "1",
  });

  const { data: countries = [] } = useFetch({
    endpoint: "movie/possible-values-by-field",
    query: "field=countries.name",
    version: "1",
  });

  useEffect(() => {
    const queryParams = [];

    if (filters.genre) queryParams.push(`genres.name=${filters.genre}`);
    if (filters.country) queryParams.push(`countries.name=${filters.country}`);
    if (filters.year) queryParams.push(`year=${filters.year}`);
    if (filters.rating) queryParams.push(`rating.imdb=${filters.rating}`);

    onChange(queryParams.join("&"));
  }, [filters, onChange]);

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.filtersWrapper}>
      <div className={styles.filters}>
        <div className={styles.selectWrapper}>
          <select
            value={filters.genre}
            onChange={(e) => handleFilterChange("genre", e.target.value)}
          >
            <option value="">Жанр</option>
            {genres.map((genre) => (
              <option key={genre.name} value={genre.name}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.selectWrapper}>
          <select
            value={filters.country}
            onChange={(e) => handleFilterChange("country", e.target.value)}
          >
            <option value="">Страна</option>
            {countries.map((country) => (
              <option key={country.name} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.selectWrapper}>
          <select
            value={filters.year}
            onChange={(e) => handleFilterChange("year", e.target.value)}
          >
            <option value="">Год</option>
            {Array.from({ length: 46 }, (_, i) => 2025 - i).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.selectWrapper}>
          <select
            value={filters.rating}
            onChange={(e) => handleFilterChange("rating", e.target.value)}
          >
            <option value="">Рейтинг</option>
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
    </div>
  );
}

export default MoviesFiltersPanel;
