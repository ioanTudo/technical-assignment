import { useEffect, useState } from "react";

const useTopRatedMovies = (currentPageProp, query) => {
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [prevQuery, setPrevQuery] = useState(query);
  const [errorTopRatedMsg, setErrorTopRatedMsg] = useState("");

  useEffect(() => {
    const fetchTopRated = async () => {
      const resetPage = query !== prevQuery;

      try {
        const url = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${currentPageProp}&query=${query}`;
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

        if (resetPage) {
          setPrevQuery();
        }

        setTopRatedMovies(() => [...topRatedMovies, ...data.results]);
      } catch (error) {
        if (error.message.includes("404")) {
          setErrorTopRatedMsg("movies not found");
        } else if (error.message.includes("503")) {
          setErrorTopRatedMsg("problem with the server");
        }
      }
    };

    fetchTopRated();
  }, [currentPageProp, query]);

  return { topRatedMovies, errorTopRatedMsg };
};

export default useTopRatedMovies;
