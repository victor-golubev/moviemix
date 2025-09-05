import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import MoviesTabs from "./components/MoviesTabs/MoviesTabs";
import Footer from "./components/Footer/Footer";
import MoviesCategories from "./components/MoviesCategories/MoviesCategories";
import SearchResults from "./pages/SearchResults/SearchResults";
import MovieDetails from "./pages/MovieDetails/MovieDetails";
import MoviesTabsAll from "./pages/MoviesTabsAll/MoviesTabsAll";
import MoviesCategoriesAll from "./pages/MoviesCategoriesAll/MoviesCategoriesAll";
import Slider from "./components/Slider/Slider";

function App() {
  return (
    <>
      <Router>
        <Header />
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Slider />
                  <MoviesTabs />
                  <MoviesCategories />
                </>
              }
            />
            <Route path="/search/:query" element={<SearchResults />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/popular-movies/" element={<MoviesTabsAll />} />
            <Route path="/categories/" element={<MoviesCategoriesAll />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </>
  );
}

export default App;
