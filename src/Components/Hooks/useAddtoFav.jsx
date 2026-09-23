import { useEffect, useState, useContext } from "react";
import { FavouriteContext } from "../../Contexts/Contexts";

const useAddTofav = () => {
  const [favouriteMovie, setFavouriteMovie] = useState([]);
  const [, setFavourite] = useContext(FavouriteContext);

  useEffect(() => {
    try {
      const favMovies = JSON.parse(localStorage.getItem("savedFavs")) || [];
      setFavouriteMovie(favMovies);
      setFavourite(favMovies);
    } catch (error) {
      setFavouriteMovie([]);
      setFavourite([]);
    }
  }, [setFavourite]);

  const handleAddToFav = (movie) => {
    if (!favouriteMovie.find((fav) => fav.id === movie.id)) {
      const updatedList = [...favouriteMovie, movie];
      setFavouriteMovie(updatedList);
      setFavourite(updatedList);
      localStorage.setItem("savedFavs", JSON.stringify(updatedList));
    }
  };

  const handleDelete = (id) => {
    const updatedList = favouriteMovie.filter((movie) => movie.id !== id);
    setFavouriteMovie(updatedList);
    setFavourite(updatedList);
    localStorage.setItem("savedFavs", JSON.stringify(updatedList));
  };

  return { favouriteMovie, handleAddToFav, handleDelete };
};

export default useAddTofav;
