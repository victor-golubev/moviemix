import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchResultsPage from "@/pages/SearchResultsPage/SearchResultsPage";
import MovieDetailsPage from "@/pages/MovieDetailsPage/MovieDetailsPage";
import MoviesTabsPage from "@/pages/MoviesTabsPage/MoviesTabsPage";
import MoviesCategoriesPage from "@/pages/MoviesCategoriesPage/MoviesCategoriesPage";
import Layout from "@/components/Layout/Layout";
import HomePage from "@/pages/HomePage/HomePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/search/:query" element={<SearchResultsPage />} />
          <Route path="/movie/:id" element={<MovieDetailsPage />} />
          <Route path="/popular-movies/" element={<MoviesTabsPage />} />
          <Route path="/categories/" element={<MoviesCategoriesPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
