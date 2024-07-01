import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Table from "../GlobalComponents/Table";
import { RepoType } from "../../shared/types";

const sampleRows: RepoType[] = [
  {
    id: "1",
    name: "Javascript App",
    language: "Javascript",
    url: "url1",
    stars: 30,
    forks: 1,
    open_issues: 1,
  },
  {
    id: "2",
    name: "Ruby App",
    language: "Ruby",
    url: "url2",
    stars: 25,
    forks: 1,
    open_issues: 1,
  },
  {
    id: "3",
    name: "Typescript App",
    language: "Typescript",
    url: "url3",
    stars: 35,
    forks: 1,
    open_issues: 1,
  },
];

describe("Table Component", () => {
  beforeEach(() => {
    render(<Table rows={sampleRows} />);
  });

  test("renders table with correct headers", () => {
    const headers = screen.getAllByRole("columnheader");
    expect(headers).toHaveLength(7);
    expect(headers[0]).toHaveTextContent("Id");
    expect(headers[1]).toHaveTextContent("Name");
    expect(headers[2]).toHaveTextContent("Language");
    expect(headers[3]).toHaveTextContent("Url");
    expect(headers[4]).toHaveTextContent("Stars");
    expect(headers[5]).toHaveTextContent("Forks");
    expect(headers[6]).toHaveTextContent("Open Issues");
  });

  test("renders correct number of rows", () => {
    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(4); // 1 header row + 3 data rows
  });

  test("orders rows based on selected value", () => {
    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "stars" } });
    const firstRow = screen.getAllByRole("row")[1];
    expect(firstRow).toHaveTextContent("Ruby App");
  });

  test("switches order direction correctly", () => {
    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "stars" } });
    const button = screen.getByRole("button", { name: /Switch order/i });
    fireEvent.click(button);
    const firstRow = screen.getAllByRole("row")[1];
    expect(firstRow).toHaveTextContent("Typescript App");
  });
});
