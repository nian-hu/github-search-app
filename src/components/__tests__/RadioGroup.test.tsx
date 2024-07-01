import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import RadioGroup from "../GlobalComponents/RadioGroup";

describe("RadioGroup Component", () => {
  const options = ["users", "orgs"];
  const onChange = jest.fn();

  test("renders all radio options", () => {
    render(
      <RadioGroup
        options={options}
        onChange={onChange}
        currentSelected="users"
      />
    );
    options.forEach((option) => {
      expect(screen.getByLabelText(option)).toBeInTheDocument();
    });
  });

  test("checks the correct radio option", () => {
    render(
      <RadioGroup
        options={options}
        onChange={onChange}
        currentSelected="orgs"
      />
    );
    const checkedRadio = screen.getByLabelText("orgs");
    expect(checkedRadio).toBeChecked();
  });

  test("calls onChange when a different radio option is selected", () => {
    render(
      <RadioGroup
        options={options}
        onChange={onChange}
        currentSelected="users"
      />
    );
    const radio = screen.getByLabelText("orgs");
    fireEvent.click(radio);
    expect(onChange).toHaveBeenCalled();
  });

  test("does not check other radio options", () => {
    render(
      <RadioGroup
        options={options}
        onChange={onChange}
        currentSelected="users"
      />
    );
    const uncheckedRadios = options.filter((option) => option !== "users");
    uncheckedRadios.forEach((option) => {
      expect(screen.getByLabelText(option)).not.toBeChecked();
    });
  });
});
