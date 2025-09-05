import { useState, useEffect } from "react";
import styles from "./styles.module.css";
import useFetch from "../../helpers/hooks/useFetch";
const API_KEY = import.meta.env.VITE_KINOPOISK_API_KEY;
import { Link } from "react-router-dom";
import CardMovie from "../CardMovie/CardMovie";
import tabs from "../../helpers/tabs";

function MoviesTabs() {
  const [activeTab, setActiveTab] = useState(0);
  const [moviesData, setMoviesData] = useState({});
  const [loading, setLoading] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchTabs = async () => {
      const promises = tabs.map(async (tab) => {
        setErrors((prev) => ({ ...prev, [tab.id]: true }));

        try {
          const res = await fetch(
            `https://api.kinopoisk.dev/v1.4/${tab.endpoint}?${tab.query}&limit=8`,
            { headers: { "X-API-KEY": API_KEY } }
          );
          if (!res.ok) throw new Error("Fetch error");
          const data = await res.json();
          return { id: tab.id, data: data.docs };
        } catch (err) {
          return { id: tab.id, error: err };
        } finally {
          setErrors((prev) => ({ ...prev, [tab.id]: false }));
        }
      });

      const results = await Promise.all(promises);
      const newMovies = {};
      const newErrors = {};
      results.forEach((r) => {
        if (r.data) newMovies[r.id] = r.data;
        if (r.error) newErrors[r.id] = r.error;
      });
      setMoviesData(newMovies);
      setErrors(newErrors);
    };

    fetchTabs();
  }, []);

  const activeData = moviesData[tabs[activeTab].id];
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
                onClick={() => setActiveTab(i)}
                className={`${styles.label} ${
                  activeTab === i ? styles.active : ""
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <Link to={`/popular-movies`} className={styles.see_all}>
            Смотреть все
          </Link>
        </div>

        <div className={styles.tab}>
          {loading[tabs[activeTab].id] && <p>Загрузка...</p>}
          {errors[tabs[activeTab].id] && (
            <p>Ошибка: {errors[tabs[activeTab].id].message}</p>
          )}

          {activeData?.map((movie) => (
            <CardMovie movie={movie} key={movie.id} />
          ))}

          {!loading[tabs[activeTab].id] && !activeData?.length && (
            <p>Фильмы не найдены</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default MoviesTabs;
