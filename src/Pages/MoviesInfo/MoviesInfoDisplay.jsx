import { useParams } from "react-router";
import useAddTofav from "../../Components/Hooks/useAddtoFav";
import "./MovieInfo.css";
import { Comments } from "./Comments";
import useMovieInfo from "../../api/getMovieInfo";

export const MoviesInfoDisplay = ({
  title,
  imageUrl,
  overview,
  release_date,

  genres = [],
}) => {
  const { movieId } = useParams();
  const { favouriteMovie, handleAddToFav, handleDelete } = useAddTofav();
  const { loading } = useMovieInfo();

  const isFavourite = favouriteMovie.some((movie) => movie.id === movieId);

  return (
    <div className="movie_wrapper">
      <div className="movieInfo_container">
        <div className="img_container">
          {loading ? (
            <span class="loader"></span>
          ) : (
            <img
              src={`https://image.tmdb.org/t/p/w500/${imageUrl}`}
              alt={title}
            />
          )}
        </div>
      </div>

      <div className="addFav_container">
        <div className="info_container">
          <h1>{title}</h1>
          <hr />
          <span>
            <strong>Info: </strong>
            {overview}
          </span>
          <hr />
          <span>
            <strong>Release Date: </strong>
            {release_date}
          </span>
          <hr />
          <div style={{ display: "flex", flexDirection: "row" }}>
            <strong>Genres: </strong>
            {genres.map((gen, index) => (
              <div key={index}>
                <span>{gen.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="btns_container">
          {isFavourite ? (
            <button
              className="delBtn buttonFav"
              onClick={() => handleDelete(movieId)}
            >
              Remove from Favorites
            </button>
          ) : (
            <button
              className="addToFavBtn buttonFav"
              onClick={() =>
                handleAddToFav({
                  id: movieId,
                  title,
                  imageUrl,
                  overview,
                  release_date,
                  genres,
                })
              }
            >
              Add to Favorites
            </button>
          )}
        </div>

        <div className="ratingAndComm_container">
          <Comments commId={movieId} />
        </div>
      </div>
    </div>
  );
};
