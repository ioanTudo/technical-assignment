// hooks/useTrendingMovies.js
import { useState, useEffect } from "react";

const useTrendingMovies = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [errorMsgTrending, setErrorMsgTrending] = useState("");

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const url =
          "https://api.themoviedb.org/3/trending/movie/day?language=en-US";

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
        setTrendingMovies(data.results);
      } catch (error) {
        if (error.message.includes("404")) {
          setErrorMsgTrending("movies not found");
        } else if (error.message.includes("503")) {
          setErrorMsgTrending("problem with the server");
        }
      }
    };

    fetchTrendingMovies();
  }, []);

  return { trendingMovies, errorMsgTrending };
};

export default useTrendingMovies;
