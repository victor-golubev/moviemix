import { useState, useEffect } from "react";
import { ERROR_MESSAGES } from "@/constants/messages";

export default function usePopularMovies({ tabs, activeTab, page, limit }) {
  const [moviesData, setMoviesData] = useState({});
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const API_KEY = import.meta.env.VITE_KINOPOISK_API_KEY;

  useEffect(() => {
    if (!tabs || tabs.length === 0) return;

    let cancelled = false;
    const currentTab = tabs[activeTab];

    async function fetchMovies() {
      setIsLoading(true);

      try {
        const res = await fetch(
          `https://api.kinopoisk.dev/v1.4/${currentTab.endpoint}?${currentTab.query}&limit=${limit}&page=${page}`,
          { headers: { "X-API-KEY": API_KEY } }
        );

        if (!res.ok) throw new Error(ERROR_MESSAGES.default);
        const json = await res.json();

        if (!cancelled) {
          setMoviesData((prev) => ({
            ...prev,
            [currentTab.id]: json.docs || [],
          }));
          setTotalPages(json.pages || 1);
          setErrors((prev) => ({ ...prev, [currentTab.id]: null }));
        }
      } catch (e) {
        if (!cancelled) {
          setErrors((prev) => ({ ...prev, [currentTab.id]: e }));
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    fetchMovies();
    return () => {
      cancelled = true;
    };
  }, [activeTab, page, limit]);

  return { moviesData, errors, isLoading, totalPages };
}
