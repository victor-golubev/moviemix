import { useState, useEffect } from "react";

function useFiltersFetch({ field = "" }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const URL =
    "https://api.kinopoisk.dev/v1/movie/possible-values-by-field?field=";
  const API_KEY = import.meta.env.VITE_KINOPOISK_API_KEY;

  useEffect(() => {
    if (!field) return;

    const controller = new AbortController();

    async function fetchData() {
      setIsLoading(true);
      setError(null);

      try {
        const url = `${URL}${field ? `${field}` : ""}`;
        const response = await fetch(url, {
          headers: {
            "X-API-KEY": API_KEY,
            "Content-Type": "application/json",
          },
          signal: controller.signal,
        });

        const contentType = response.headers.get("content-type");
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        if (!contentType || !contentType.includes("application/json")) {
          const text = await response.text();
          throw new Error(`Response is not JSON: ${text}`);
        }

        const result = await response.json();

        if (result.docs) {
          setData(result.docs);
        } else {
          setData(result);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
          setError(err);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();

    return () => controller.abort();
  }, [field]);

  return { data, isLoading, error };
}

export default useFiltersFetch;
