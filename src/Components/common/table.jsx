import React from "react";
import TableBody from "./TableBody";
import TableHeader from "./tableheader";

const Table = ({ data, column, sortColumn, onSortItem }) => {
  return (
    <table className="table">
      <TableHeader
        onSortItem={onSortItem}
        column={column}
        sortColumn={sortColumn}
      />
      <TableBody data={data} column={column} />
    </table>
  );
};

export default Table;
