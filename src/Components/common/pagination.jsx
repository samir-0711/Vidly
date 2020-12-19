import React, { Component } from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Pagination = ({ totalCount, currentPage, pageSize, onPageClick }) => {
  const totalPage = Math.ceil(totalCount / pageSize);
  if (totalPage === 1) return null;
  const pageNumbers = _.range(1, totalPage + 1);

  console.log(currentPage);

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li className="page-item">
            <a
              onClick={() => onPageClick(number)}
              style={{ cursor: "pointer" }}
              className={
                number === currentPage ? "page-link active" : "page-link"
              }
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
