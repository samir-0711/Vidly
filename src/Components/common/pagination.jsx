import React, { Component } from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Pagination = ({ totalCount, currentPage, pageSize, onPageClick }) => {
  const totalPage = Math.ceil(totalCount / pageSize);
  if (totalPage === 1) return null;
  const pageNumbers = _.range(1, totalPage + 1);

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={
              number === currentPage ? "page-item active" : "page-item"
            }
          >
            <a
              onClick={() => onPageClick(number)}
              style={{ cursor: "pointer" }}
              className="page-link"
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  totalCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageClick: PropTypes.func.isRequired,
};

export default Pagination;
