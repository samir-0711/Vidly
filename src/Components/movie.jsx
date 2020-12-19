import React, { Component, useEffect, useState } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import paginate from "../utilis/paginate";

export function Movie() {
  const [state, setState] = useState(() => ({
    movieData: getMovies(),
    currentPage: 1,
    pageSize: 4,
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

  const handleClick = function (movies) {
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

  const count = state.movieData.length;

  if (count === 0) return <p>There is no movies in the database</p>;

  const movie = paginate(state.movieData, state.currentPage, state.pageSize);

  //Zen coding:- table.table>thead>tr>th*4
  return (
    <React.Fragment>
      <p>Showing {count} movies in the database</p>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Genre</th>
            <th>Stock</th>
            <th>Rate</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {movie.map((movie) => (
            <tr key={movie._id}>
              <td>{movie.title}</td>
              <td>{movie.genre.name}</td>
              <td>{movie.numberInStock}</td>
              <td>{movie.dailyRentalRate}</td>
              <td>
                <Like like={movie.like} onClick={() => handleClick(movie)} />
              </td>
              <td>
                <button
                  onClick={() => handleDelete(movie)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        totalCount={count}
        pageSize={state.pageSize}
        currentPage={state.currentPage}
        onPageClick={handlePageClick}
      />
    </React.Fragment>
  );
}
