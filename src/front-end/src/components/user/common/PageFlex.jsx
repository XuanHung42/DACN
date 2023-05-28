import React from "react";

const Pager = ({ pageCount, hasPrevPage, hasNextPage, onPageChange }) => {
  if (!pageCount || pageCount < 2) {
    return "";
  }

  return (
    <div className="py-4 d-flex justify-content-between">
      {hasPrevPage ? (
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => onPageChange(-1)}
        >
          Previous Page
        </button>
      ) : (
        <button type="button" className="btn btn-secondary">
          Previous Page
        </button>
      )}

      {hasNextPage ? (
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => onPageChange(1)}
        >
          Next Page
        </button>
      ) : (
        <button type="button" className="btn btn-secondary">
          Next Page
        </button>
      )}
    </div>
  );
};

export default Pager;
