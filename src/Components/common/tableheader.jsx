import React from "react";

const TableHeader = ({ onSortItem, sortColumn, column }) => {
  const raiseSort = (path) => {
    let order = "asc";
    if (sortColumn.path === path) {
      order = sortColumn.order === "asc" ? "desc" : "asc";
    }
    onSortItem({ path, order });
  };

  const renderSortIcon = (column) => {
    if (column.path !== sortColumn.path) return null;
    return (
      <i
        className={
          sortColumn.order === "asc" ? "fa fa-sort-asc" : "fa fa-sort-desc"
        }
      />
    );
  };

  return (
    <thead>
      <tr>
        {column.map((column) => (
          <th
            className="clickable"
            key={column.path || column.key}
            onClick={() => raiseSort(column.path)}
          >
            {column.label} {renderSortIcon(column)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
