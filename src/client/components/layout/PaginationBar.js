import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Pagination from 'react-js-pagination';

const PaginationBar = ({
  activePage,
  totalPage,
  onChange,
  itemsCountPerPage,
  pageRangeDisplayed,
  totalItemsCount
}) => (
  <div className="pagination__wrapper">
    <p>Page {activePage}/{totalPage > 1000 ? 1000 : totalPage}</p>
    <Pagination
        activePage={activePage}
        firstPageText={<FontAwesomeIcon icon={['fa', 'angle-double-left']} />}
        itemsCountPerPage={itemsCountPerPage}
        lastPageText={<FontAwesomeIcon icon={['fa', 'angle-double-right']} />}
        nextPageText={<FontAwesomeIcon icon={['fa', 'angle-right']} />}
        onChange={onChange}
        pageRangeDisplayed={pageRangeDisplayed}
        prevPageText={<FontAwesomeIcon icon={['fa', 'angle-left']} />}
        totalItemsCount={totalItemsCount > 1000 ? 1000 : totalItemsCount}
    />
  </div>
);

export default PaginationBar;