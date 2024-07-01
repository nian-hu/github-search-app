import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import SearchInput from "../GlobalComponents/SearchInput";

describe("SearchInput Component", () => {
  const setup = () => {
    const onChange = jest.fn();
    const onSubmit = jest.fn();
    const onPressEnter = jest.fn();
    const placeholder = "Search here...";

    render(
      <SearchInput
        value=""
        onChange={onChange}
        onSubmit={onSubmit}
        onPressEnter={onPressEnter}
        placeholder={placeholder}
      />
    );

    return { onChange, onSubmit, onPressEnter };
  };

  test("renders input with correct placeholder", () => {
    setup();
    const input = screen.getByPlaceholderText("Search here...");
    expect(input).toBeInTheDocument();
  });

  test("calls onChange when typing in the input", () => {
    const { onChange } = setup();
    const input = screen.getByPlaceholderText("Search here...");
    fireEvent.change(input, { target: { value: "test" } });
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  test("calls onSubmit when clicking the button", () => {
    const { onSubmit } = setup();
    const button = screen.getByRole("button", { name: /search/i });
    fireEvent.click(button);
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  test("calls onPressEnter when pressing Enter key in the input", () => {
    const { onPressEnter } = setup();
    const input = screen.getByPlaceholderText("Search here...");
    fireEvent.keyUp(input, { key: "Enter", code: "Enter", charCode: 13 });
    expect(onPressEnter).toHaveBeenCalledTimes(1);
  });
});
