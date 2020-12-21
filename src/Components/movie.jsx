import React, { Component, useEffect, useState } from "react";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./common/pagination";
import paginate from "../utilis/paginate";
import { getGenres } from "../services/fakeGenreService";
import ListGroup from "./common/listgroup";
import MovieTable from "./MovieTable";
import _ from "lodash";

export default function Movie() {
  const [state, setState] = useState(() => ({
    movieData: getMovies(),
    genres: [{ _id: "", name: "All Genres" }, ...getGenres()],
    currentPage: 1,
    selectedItem: { _id: "", name: "All Genres" },
    pageSize: 4,
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
    setState({ ...state, currentPage: 1, selectedItem: genre });
  };

  const handleSort = (sortColumn) => {
    setState({ ...state, sortColumn });
  };

  const getPagedData = () => {
    const filtered = state.selectedItem._id
      ? state.movieData.filter(
          (movie) => movie.genre._id === state.selectedItem._id
        )
      : state.movieData;

    const sortedItems = _.orderBy(
      filtered,
      [state.sortColumn.path],
      [state.sortColumn.order]
    );

    const movie = paginate(sortedItems, state.currentPage, state.pageSize);

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
        <p>Showing {totalCount} movies in the database</p>
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
