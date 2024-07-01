import React from "react";
import classnames from "classnames";

export interface PaginationProps {
  totalCount: number;
  pageSize: number;
  currentPage: number;
  onPageClick: (num: number) => void;
}

const Pagination = (props: PaginationProps) => {
  const { totalCount, pageSize, currentPage, onPageClick } = props;
  const numPages = Math.ceil(totalCount / pageSize);
  const pageArray = Array.from({ length: numPages }, (_, i) => i + 1);

  return (
    <div className="flex flex-row">
      {pageArray.map((num, idx) => (
        <div
          key={idx}
          className={classnames(
            "p-3 bg-indigo-400 cursor-pointer hover:opacity-50",
            {
              "bg-indigo-500": currentPage === num,
            }
          )}
          onClick={() => onPageClick(num)}
        >
          {num}
        </div>
      ))}
    </div>
  );
};

export default Pagination;
