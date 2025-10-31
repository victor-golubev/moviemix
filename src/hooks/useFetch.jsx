import { useState, useEffect, useCallback } from "react";
import { ERROR_MESSAGES } from "@/constants/messages";

function useFetch({ endpoint = "movie", query = "", limit, version = "1.4" }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const URL = `https://api.kinopoisk.dev/v${version}/`;
  const API_KEY = import.meta.env.VITE_KINOPOISK_API_KEY;

  const fetchData = useCallback(
    async (controller) => {
      setIsLoading(true);
      setError(null);

      try {
        const queryString = [query, limit ? `limit=${limit}` : ""]
          .filter(Boolean)
          .join("&");

        const url = `${URL}${endpoint}${queryString ? `?${queryString}` : ""}`;

        const response = await fetch(url, {
          headers: {
            "X-API-KEY": API_KEY,
            "Content-Type": "application/json",
          },
          signal: controller.signal,
        });

        const contentType = response.headers.get("content-type");
        if (!response.ok) throw new Error(ERROR_MESSAGES.default);
        if (!contentType || !contentType.includes("application/json")) {
          const text = await response.text();
          throw new Error(`Response is not JSON: ${text}`);
        }

        const result = await response.json();
        setData(result ?? []);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
          setError(err);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [endpoint, query, limit, version, API_KEY]
  );

  useEffect(() => {
    if (!endpoint) return;

    const controller = new AbortController();
    fetchData(controller);

    return () => controller.abort();
  }, [fetchData]);

  return {
    data,
    isLoading,
    error,
    refetch: () => fetchData(new AbortController()),
  };
}

export default useFetch;
