import { useState, useEffect } from "react";
import styles from "./styles.module.css";
import noPhoto from "../../img/no-photo.jpg";
import { Link } from "react-router-dom";
import Skeleton from "../../components/Skeleton/Skeleton";
import Pagination from "../../components/Pagination/Pagination";
const API_KEY = import.meta.env.VITE_KINOPOISK_API_KEY;

const tabs = [
  {
    id: "tab1",
    label: "Популярные фильмы",
    endpoint: "movie",
    query: "type=movie&rating.imdb=8-10",
  },
  {
    id: "tab2",
    label: "Популярные сериалы",
    endpoint: "movie",
    query: "type=tv-series&rating.imdb=8-10",
  },
  {
    id: "tab3",
    label: "Подборка фильмов",
    endpoint: "movie",
    query: "type=movie&lists=top250",
  },
];

function MoviesTabsAll() {
  const [activeTab, setActiveTab] = useState(0);
  const [moviesData, setMoviesData] = useState({});
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchAllTabs = async () => {
      setLoading(true);
      const newMoviesData = {};
      const newErrors = {};

      for (const tab of tabs) {
        try {
          const response = await fetch(
            `https://api.kinopoisk.dev/v1.4/${tab.endpoint}?${tab.query}&limit=${limit}&page=${page}`,
            {
              headers: {
                "X-API-KEY": API_KEY,
                "Content-Type": "application/json",
              },
            }
          );

          if (!response.ok) throw new Error("Fetch error");

          const result = await response.json();
          setTotalPages(result.pages || 1);
          newMoviesData[tab.id] = result.docs || [];
        } catch (err) {
          newErrors[tab.id] = err;
        }
      }

      setMoviesData(newMoviesData);
      setErrors(newErrors);
      setLoading(false);
    };

    fetchAllTabs();
  }, [activeTab, page, limit]);

  const activeData = moviesData[tabs[activeTab].id] || [];
  const activeError = errors[tabs[activeTab].id];

  return (
    <section className={styles.tabs}>
      <div className="container">
        <h3 className="section-title">Что посмотреть</h3>
        <div className={styles.labels_wrapper}>
          <div className={styles.labels}>
            {tabs.map((tab, i) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(i);
                  setPage(1); // Сбрасываем на первую страницу при смене таба
                }}
                className={`${styles.label} ${
                  activeTab === i ? styles.active : ""
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.tab}>
          <div className={styles.tab_content}>
            {loading && <Skeleton type="listCard" count={12} />}
            {activeError && <p>Error: {activeError.message}</p>}

            {!loading && !activeError && activeData.length === 0 && (
              <p>Нет данных для отображения</p>
            )}
            {!loading &&
              activeData.map((movie) => (
                <Link
                  to={`/movie/${movie.id}`}
                  key={movie.id}
                  className={styles.item}
                >
                  <div className={styles.poster}>
                    <img
                      src={
                        movie.poster?.previewUrl
                          ? movie.poster.previewUrl
                          : noPhoto
                      }
                      alt={movie.name || movie.alternativeName}
                      onError={(e) => {
                        e.target.src = noPhoto;
                      }}
                    />
                  </div>
                  <div className={styles.name}>
                    {movie.name || movie.alternativeName}
                  </div>
                  <div className={styles.info}>
                    <div className={styles.info_year}>{movie.year}</div>
                    <div className={styles.info_rating}>
                      {movie.rating?.imdb > 0
                        ? movie.rating.imdb.toFixed(1)
                        : "--"}
                    </div>
                  </div>
                </Link>
              ))}
          </div>

          {totalPages > 1 && (
            <Pagination page={page} totalPages={totalPages} setPage={setPage} />
          )}
        </div>
      </div>
    </section>
  );
}

export default MoviesTabsAll;
