import React from "react";
import {Pagination as ReactPagination} from '@material-ui/lab';

const Pagination = ({ totalItems, setPage, currentPage }) => {
  const handlePageChange = (e, pageNumber) => {
    setPage(pageNumber);
  }

    return (
        <ReactPagination
            count={Math.floor(totalItems / 10)}
            shape="rounded"
            onChange={handlePageChange}
        />
    );
  } 

export default Pagination;

