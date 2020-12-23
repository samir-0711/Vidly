import React, { useState } from "react";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./common/pagination";
import paginate from "../utilis/paginate";
import { getGenres } from "../services/fakeGenreService";
import ListGroup from "./common/listgroup";
import MovieTable from "./movieTable";
import _ from "lodash";
import { Link } from "react-router-dom";
import SearchBox from "./searchBox";

export default function Movie() {
  const [state, setState] = useState(() => ({
    movieData: getMovies(),
    genres: [{ _id: "", name: "All Genres" }, ...getGenres()],
    currentPage: 1,
    selectedItem: { _id: "", name: "All Genres" },
    pageSize: 4,
    searchQuery: "",
    sortColumn: { path: "title", order: "asc" },
  }));

  //   const n = localStorage.getItem("state");
  //   if (n === null) return getMovies();
  //   return JSON.parse(n);
  // });

  //   useEffect(() => {
  //     localStorage.setItem("state", JSON.stringify(state));
  //   }, [state]);

  const handleDelete = function (movies) {
    const movie = state.movieData.filter((m) => m._id !== movies._id);
    setState({ ...state, movieData: movie });
  };

  const handleLikeClick = function (movies) {
    setState({
      ...state,
      movieData: state.movieData.map((m) => {
        if (m._id !== movies._id) return { ...m };
        return { ...m, like: !movies.like };
      }),
    });
  };

  const handlePageClick = (pageNumber) => {
    setState({ ...state, currentPage: pageNumber });
  };

  const handleItemSelect = (genre) => {
    setState({
      ...state,
      currentPage: 1,
      searchQuery: "",
      selectedItem: genre,
    });
  };

  const handleSort = (sortColumn) => {
    setState({ ...state, sortColumn });
  };

  const handleSearch = (query) => {
    setState({
      ...state,
      searchQuery: query,
      selectedItem: { _id: "", name: "All Genres" },
      currentPage: 1,
    });
  };

  const getPagedData = () => {
    const {
      searchQuery,
      selectedItem,
      movieData,
      sortColumn,
      currentPage,
      pageSize,
    } = state;

    let filtered = movieData;

    if (searchQuery) {
      filtered = movieData.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else if (selectedItem && selectedItem._id) {
      filtered = movieData.filter((m) => m.genre._id === selectedItem._id);
    }

    // filtered = state.selectedItem._id
    //   ? state.movieData.filter(
    //       (movie) => movie.genre._id === state.selectedItem._id
    //     )
    //   : state.movieData;

    const sortedItems = _.orderBy(
      filtered,
      [sortColumn.path],
      [sortColumn.order]
    );

    const movie = paginate(sortedItems, currentPage, pageSize);

    return { totalCount: filtered.length, data: movie };
  };

  if (state.movieData.length === 0)
    return <p>There is no movies in the database</p>;

  const { totalCount, data: movie } = getPagedData();

  //Zen coding:- table.table>thead>tr>th*4
  return (
    <div className="row">
      <div className="col-3">
        <ListGroup
          genres={state.genres}
          selectedItem={state.selectedItem}
          onItemSelect={handleItemSelect}
        />
      </div>
      <div className="col">
        <Link
          to="/movies/new"
          className="btn btn-primary"
          style={{ marginBottom: 20 }}
        >
          New Movie
        </Link>
        <p>Showing {totalCount} movies in the database</p>
        <SearchBox value={state.searchQuery} onChange={handleSearch} />
        <MovieTable
          movie={movie}
          sortColumn={state.sortColumn}
          onSortItem={handleSort}
          onLike={handleLikeClick}
          onDelete={handleDelete}
        />
        <Pagination
          totalCount={totalCount}
          pageSize={state.pageSize}
          currentPage={state.currentPage}
          onPageClick={handlePageClick}
        />
      </div>
    </div>
  );
}
