import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { MovieInfo } from "./Pages/MoviesInfo/MovieInfo.jsx";
import { FavouriteContext, QueryContext } from "./Contexts/Contexts.jsx";
import { StrictMode, useState } from "react";
import { FavMoviesPage } from "./Pages/FavMovies/FavMoviesPage.jsx";
import Home from "./Pages/Home/Home.jsx";

function App() {
  const favouriteContext = useState(
    JSON.parse(localStorage.getItem("savedFavs")) || []
  );
  const [query, setQuery] = useState("");

  return (
    <StrictMode>
      <QueryContext.Provider value={{ query, setQuery }}>
        <FavouriteContext.Provider value={favouriteContext}>
          <BrowserRouter>
            <Routes>
              <Route index element={<Home />} />
              <Route
                path="/movies/:movieId/:movieName"
                element={<MovieInfo />}
              />
              <Route path="/fav-movies" element={<FavMoviesPage />} />
            </Routes>
          </BrowserRouter>
        </FavouriteContext.Provider>
      </QueryContext.Provider>
    </StrictMode>
  );
}

export default App;
