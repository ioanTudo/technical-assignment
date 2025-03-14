import { useContext, useState } from "react";
import { useMovieGenres } from "../../api/getMovieGenres.jsx";
import "./Movies.css";
import { QueryContext } from "../../Contexts/Contexts.jsx";

import { TemplateMovieDisplay } from "../Templates/TemplateMovieDisplay.jsx";
import useTrendingMovies from "../../api/getTrendingMovies.jsx";
import useRecommendedMovieAndRecently from "../Hooks/useRecommendedMovie.jsx";
import Pagination from "../Pagination/Pagination.jsx";
import { useSearch } from "../../api/useSearch.jsx";
import { GenreFilter } from "../GenreFilter/GenreFilter.jsx";
import useTopRatedMovies from "../../api/getTopRatedMovies.jsx";
import usePaginationMovies from "../Hooks/usePaginationMovies.jsx";

export const Movies = () => {
  const [selectedGenre, setSelectedGenre] = useState("");
  const { currentPage, loadMore, loadMoreTopRated, topRatedCurrentPage } =
    usePaginationMovies();
  const { genreList = [], loadingGenre } = useMovieGenres();
  const { query } = useContext(QueryContext);
  const {
    movieSearchList = [],
    errorMsgDiscover,
    loadingDiscover,
  } = useSearch(query, currentPage, selectedGenre);
  const { trendingMovies, errorMsgTrending } = useTrendingMovies();
  const { recommended, recentlyViewed } = useRecommendedMovieAndRecently();
  const { topRatedMovies = [], errorTopRatedMsg } = useTopRatedMovies(
    topRatedCurrentPage,
    query
  );

  return (
    <div className="page_wrapper">
      <GenreFilter
        genreValue={selectedGenre}
        genreList={genreList}
        setGenre={setSelectedGenre}
      />

      <div className="movies_wrapper">
        {loadingGenre ? (
          <span className="loader"></span>
        ) : (
          <TemplateMovieDisplay
            title={"Discover movies"}
            movieType={movieSearchList}
            isDiscover={true}
            isLoadMore={true}
            currentPage={currentPage}
            error={errorMsgDiscover}
            loading={loadingDiscover}
          />
        )}

        <Pagination currentPage={currentPage} loadMore={loadMore} />
      </div>

      <div className="wrapper_components">
        <TemplateMovieDisplay
          title={"Recently viewed"}
          movieType={recentlyViewed}
        />

        <TemplateMovieDisplay
          title={"Recommended movies"}
          movieType={recommended}
        />
        <TemplateMovieDisplay
          title={"Trending movies"}
          movieType={trendingMovies}
          error={errorMsgTrending}
        />

        <div className="movies_wrapper">
          <TemplateMovieDisplay
            title={"Top rated movies"}
            movieType={topRatedMovies}
            isTopRated={true}
            topRatedCurrentPage={topRatedCurrentPage}
            error={errorTopRatedMsg}
          />
          <Pagination
            currentPage={topRatedCurrentPage}
            loadMore={loadMoreTopRated}
          />
        </div>
      </div>
    </div>
  );
};
