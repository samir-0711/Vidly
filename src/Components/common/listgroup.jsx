import React, { Component } from "react";

const ListGroup = ({
  genres,
  keyProperty,
  valueProperty,
  selectedItem,
  onItemSelect,
}) => {
  return (
    <ul className="list-group">
      {genres.map((genre) => (
        <li
          key={genre[keyProperty]}
          onClick={() => onItemSelect(genre)}
          style={{ cursor: "pointer" }}
          className={
            genre[valueProperty] === selectedItem[valueProperty]
              ? "list-group-item active"
              : "list-group-item"
          }
        >
          {genre[valueProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  keyProperty: "_id",
  valueProperty: "name",
};

export default ListGroup;
