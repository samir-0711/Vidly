import React from "react";
import Like from "./common/like";
import Table from "./common/table";

const MovieTable = ({ movie, onLike, onDelete, sortColumn, onSortItem }) => {
  const column = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: <Like like={movie.like} onClick={() => onLike(movie)} />,
    },
    {
      key: "delete",
      content: (
        <button
          onClick={() => onDelete(movie)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    },
  ];

  return (
    <Table
      data={movie}
      column={column}
      sortColumn={sortColumn}
      onSortItem={onSortItem}
    />
  );
};

export default MovieTable;
