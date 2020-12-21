import React from "react";
import _ from "lodash";

const TableBody = ({ data, column }) => {
  const columnRender = (items, column) => {
    if (column.content) return column.content(items);
    return _.get(items, column.path);
  };

  return (
    <tbody>
      {data.map((items) => (
        <tr key={items._id}>
          {column.map((column) => (
            <td key={items._id + (column.path || column.key)}>
              {columnRender(items, column)}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
