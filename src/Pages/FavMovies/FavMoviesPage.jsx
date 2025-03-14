import { useContext } from "react";
import { TemplatePageDisplay } from "../../Components/Templates/TemplatePage.jsx";
import { FavouriteContext } from "../../Contexts/Contexts.jsx";
import "../../Components/Movies/Movies.css";

import "./FavMovie.css";
import { TemplateMovieDisplay } from "../../Components/Templates/TemplateMovieDisplay.jsx";
import { Link } from "react-router";

export const FavMoviesPage = () => {
  const [favourite] = useContext(FavouriteContext);

  return (
    <TemplatePageDisplay>
      <div className="favMovie_bigWrapper">
        <h1 style={{ textAlign: "center" }}>My list</h1>
        <div className="movie_display_wrapper">
          <div className="movies_wrapper">
            {favourite.length === 0 ? (
              <div className="noMovies_container">
                <p> No movies added to favorites</p>
                <Link to={"/"}>
                  <p>back to main menu</p>
                </Link>
              </div>
            ) : (
              <TemplateMovieDisplay movieType={favourite} />
            )}
          </div>
        </div>
      </div>
    </TemplatePageDisplay>
  );
};
