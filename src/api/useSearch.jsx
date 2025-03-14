import { useEffect, useState } from "react";

export const useSearch = (query, currentPageProp, genreId) => {
  const [movieSearchList, setMovieSearchList] = useState([]);
  const [prevGenre, setGenre] = useState(genreId);
  const [prevQuery, setPrevQuery] = useState(query);
  const [errorMsgDiscover, setErrorMsgDiscover] = useState("");
  const [loadingDiscover, setLoadingDiscover] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      const resetPage = query !== prevQuery || genreId !== prevGenre;
      const nextPage = resetPage ? 1 : currentPageProp + 1;

      try {
        let url;
        if (query) {
          url = `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=${nextPage}&query=${query}&with_genres=${
            genreId || ""
          }`;
        } else {
          url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&language=en-US&page=${nextPage}&query=${query}&with_genres=${
            genreId || ""
          }`;
        }

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

        if (!data.results) {
          throw new Error(response.status);
        }

        const currentResults = resetPage ? [] : movieSearchList;
        setMovieSearchList([...currentResults, ...data.results]);

        if (resetPage) {
          setGenre(genreId);
          setPrevQuery(query);
        }
      } catch (error) {
        if (error.message.includes("404")) {
          setErrorMsgDiscover("movies not found");
        } else if (error.message.includes("503")) {
          setErrorMsgDiscover("problem with the server");
        }
      } finally {
        setLoadingDiscover(false);
      }
    };

    fetchMovies();
  }, [currentPageProp, query, genreId]);

  return { movieSearchList, errorMsgDiscover, loadingDiscover };
};
