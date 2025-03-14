import { useEffect, useState } from "react";

export const useMovieGenres = () => {
  const [genreList, setGenreList] = useState([]);
  const [loadingGenre, setLoadingGenre] = useState(true);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const url = "https://api.themoviedb.org/3/genre/movie/list?language=en";
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYjE0YzM1YzU0ZDJjZDM4Yzk0NjkwY2UzMDI3MDk0ZSIsIm5iZiI6MTczODA5MzczMy41MjcsInN1YiI6IjY3OTkzNGE1MWJlMTE2NDA5YzIzODk4ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nTebm3iPBrMjCJcgW-ZUykU1iF95u99wfUTXy5g9Y4M",
          },
        };

        const response = await fetch(url, options);
        const data = await response.json();
        setGenreList(data.genres);
      } catch (error) {
      } finally {
        setLoadingGenre(false);
      }
    };

    fetchGenres();
  }, []);

  return { genreList, loadingGenre };
};
