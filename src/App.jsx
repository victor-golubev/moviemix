import { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import LatestMovies from "./components/LatestMovies/LatestMovies";

function App() {
  const URL = "https://api.kinopoisk.dev/v1.4/";
  // const KEY = "SWV2KSD-5XMMY33-QSHEHBP-K76HDKA";
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch(URL, {
          headers: {
            "X-API-KEY": KEY,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Fetch error");
        }
        const result = await response.json();
        setMovies(result.docs);
      } catch (error) {
        console.error(error);
      }
    }

    fetchMovies();
  }, []);

  return (
    <>
      <Header />
      <main>
        <LatestMovies />
      </main>
      {/* {movies.map((movie) => (
        <div key={movie.id}>{movie.name}</div>
      ))} */}
    </>
  );
}

export default App;
