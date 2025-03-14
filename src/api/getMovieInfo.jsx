import { useEffect, useState } from "react";

const useMovieInfo = (id) => {
  const [movieInfo, setMovieInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  useEffect(() => {
    const fetchMovieInfo = async () => {
      try {
        setLoading(true);
        const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
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
        setMovieInfo(data);
      } catch (error) {
        if (error.message.includes("404")) {
          setErrorMsg("movies not found");
        } else if (error.message.includes("503")) {
          setErrorMsg("problem with the server");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchMovieInfo();
  }, [id]);
  return { movieInfo, errorMsg, loading };
};

export default useMovieInfo;
