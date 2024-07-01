import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import RepositorySearch from "../RepositorySearch";
import { USER_TYPES } from "../../shared/constants";

describe("RepositorySearch Component", () => {
  const setup = () => {
    render(<RepositorySearch />);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the component with initial state", () => {
    setup();
    expect(screen.getByText("Github Repository Search")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter Github user or organization")
    ).toBeInTheDocument();
    USER_TYPES.forEach((type) => {
      expect(screen.getByLabelText(type)).toBeInTheDocument();
    });
    expect(
      screen.getByText("No results. Try a different search?")
    ).toBeInTheDocument();
  });
});
