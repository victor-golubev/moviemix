import { useState, useEffect } from "react";
import useFetch from "@/hooks/useFetch";

export default function useSliderMovies() {
  const { data, error } = useFetch({
    endpoint: "movie",
    query: "type=movie&year=2025&sortField=year&sortType=-1",
  });

  const [movies, setMovies] = useState([]);
  const [index, setIndex] = useState(0);
  const [isLoading, setIsLoaded] = useState(false);

  const maxIndex = Math.max(movies.length - 2, 0);

  const handlePrev = () => setIndex((prev) => Math.max(prev - 1, 0));
  const handleNext = () => setIndex((prev) => Math.min(prev + 1, maxIndex));

  useEffect(() => {
    if (data?.docs?.length > 0) {
      setMovies(data.docs);
      setIsLoaded(true);
    }
  }, [data]);

  return { movies, isLoading, error, index, handlePrev, handleNext, maxIndex };
}
