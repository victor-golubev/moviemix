import { useState } from "react";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";

import usePopularMoviesTabs from "@/hooks/usePopularMoviesTabs";
import usePopularMovies from "@/hooks/usePopularMovies";

import Skeleton from "@/components/Skeleton/Skeleton";
import Pagination from "@/components/Pagination/Pagination";
import noPhoto from "@/assets/img/no-photo.jpg";
import CardMovie from "../CardMovie/CardMovie";

function MoviesTabs({ showPagination = false, limit = 8, showAll = false }) {
  const { tabs, activeTab, setActiveTab } = usePopularMoviesTabs();
  const [page, setPage] = useState(1);

  const { moviesData, isLoading, errors, totalPages } = usePopularMovies({
    tabs,
    activeTab,
    page,
    limit,
  });

  if (!tabs || tabs.length === 0) return null;

  const currentTab = tabs[activeTab];
  const activeData = currentTab ? moviesData[currentTab.id] || [] : [];
  const activeError = currentTab ? errors[currentTab.id] : null;

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
                  setPage(1);
                }}
                className={`${styles.label} ${
                  activeTab === i ? styles.active : ""
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          {showAll && (
            <Link to="/popular-movies/" className="show_all">
              Смотреть все
            </Link>
          )}
        </div>

        {activeError && <p className="error">{activeError.message}</p>}
        <div className={styles.tab}>
          {isLoading && <Skeleton type="listCard" count={12} />}

          {!isLoading && !activeError && activeData.length === 0 && (
            <p className={styles.empty}>Нет данных для отображения</p>
          )}

          {!isLoading &&
            activeData.map((movie) => (
              <CardMovie movie={movie} key={movie.id} />
            ))}
        </div>

        {showPagination && totalPages > 1 && (
          <Pagination page={page} totalPages={totalPages} setPage={setPage} />
        )}
      </div>
    </section>
  );
}

export default MoviesTabs;
