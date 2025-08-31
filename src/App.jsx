import { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import LatestMovies from "./components/LatestMovies/LatestMovies";
import MoviesTabs from "./components/MoviesTabs/MoviesTabs";
import useFetch from "./helpers/hooks/useFetch";
import Footer from "./components/Footer/Footer";
import MoviesCategories from "./components/MoviesCategories/MoviesCategories";

function App() {
  const { data, isLoading, error } = useFetch({
    endpoint: "movie",
    query: "field=year&search=2025-2025",
  });

  return (
    <>
      <Header />
      <main>
        <LatestMovies movies={data} />
        <MoviesTabs />
        <MoviesCategories />
      </main>
      <Footer />
    </>
  );
}

export default App;
