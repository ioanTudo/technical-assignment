import { useState } from "react";

const usePaginationMovies = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [topRatedCurrentPage, setTopRatedCurrentPage] = useState(1);

  const loadMore = () => {
    setCurrentPage((page) => page + 1);
  };

  const loadMoreTopRated = () => {
    setTopRatedCurrentPage((page) => page + 1);
  };

  return {
    currentPage,
    loadMore,
    topRatedCurrentPage,
    loadMoreTopRated,
  };
};

export default usePaginationMovies;
