import { useState, useEffect } from "react";

function useFetch({ endpoint = "", query = "" }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const URL = "https://api.kinopoisk.dev/v1.4/";
  const API_KEY = import.meta.env.VITE_KINOPOISK_API_KEY;

  useEffect(() => {
    if (!endpoint) return;

    const controller = new AbortController();

    async function fetchData() {
      setIsLoading(true);
      setError(null);

      try {
        const url = `${URL}${endpoint}${query ? `?${query}` : ""}`;
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
        setData(result.docs || []);
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
  }, [endpoint, query]);

  return { data, isLoading, error };
}

export default useFetch;
