import { useState, useEffect } from "react";
import styles from "./styles.module.css";
import useFetch from "../../helpers/hooks/useFetch";

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

function MoviesTabs() {
  const [activeTab, setActiveTab] = useState(0);
  const [moviesData, setMoviesData] = useState({});
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchAllTabs = async () => {
      setLoading(true);

      for (const tab of tabs) {
        try {
          const response = await fetch(
            `https://api.kinopoisk.dev/v1.4/${tab.endpoint}?${tab.query}&limit=8`,
            {
              headers: {
                "X-API-KEY": "SWV2KSD-5XMMY33-QSHEHBP-K76HDKA",
                "Content-Type": "application/json",
              },
            }
          );

          if (!response.ok) throw new Error("Fetch error");

          const result = await response.json();
          setMoviesData((prev) => ({ ...prev, [tab.id]: result.docs }));
        } catch (err) {
          setErrors((prev) => ({ ...prev, [tab.id]: err }));
        }
      }

      setLoading(false);
    };

    fetchAllTabs();
  }, []);

  const activeData = moviesData[tabs[activeTab].id];
  const activeError = errors[tabs[activeTab].id];

  return (
    <section className={styles.tabs}>
      <div className="container">
        <h3 className="section-title">Что посмотреть</h3>
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

        <div className={styles.tab}>
          {loading && <p>Loading...</p>}
          {activeError && <p>Error: {activeError.message}</p>}
          {activeData?.map((movie) => (
            <div key={movie.id} className={styles.item}>
              <div className={styles.poster}>
                <img src={`${movie.poster?.previewUrl}`} alt="poster" />
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

export default MoviesTabs;
