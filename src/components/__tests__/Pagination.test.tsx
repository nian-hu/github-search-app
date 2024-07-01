import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Pagination from "../GlobalComponents/Pagination";

describe("Pagination Component", () => {
  const setup = () => {
    const onPageClick = jest.fn();
    const totalCount = 12;
    const pageSize = 5;
    const currentPage = 1;

    render(
      <Pagination
        totalCount={totalCount}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageClick={onPageClick}
      />
    );

    return { onPageClick };
  };

  test("renders correct number of pages", () => {
    setup();
    const pages = screen.getAllByText(/\d+/);
    expect(pages.length).toBe(3);
  });

  test("calls onPageClick with correct number when a page is clicked", () => {
    const { onPageClick } = setup();
    const page = screen.getByText("3");
    fireEvent.click(page);
    expect(onPageClick).toHaveBeenCalledWith(3);
  });
});
