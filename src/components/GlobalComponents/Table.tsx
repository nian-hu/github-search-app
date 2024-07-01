import React, { useState, useEffect } from "react";
import { formatString } from "../../shared/utils";
import { RepoType } from "../../shared/types";

export interface TableProps {
  rows: RepoType[];
}

const Table = (props: TableProps) => {
  const { rows } = props;
  const [sortedRows, setSortedRows] = useState<RepoType[]>([]);
  const [order, setOrder] = useState<string>("asc");
  const [orderBy, setOrderBy] = useState<keyof RepoType | "">("");

  useEffect(() => {
    setSortedRows(rows);
  }, [rows]);

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value) {
      setSortedRows([
        ...rows.filter((row) => {
          return Object.values(row).join("").toLowerCase().includes(value);
        }),
      ]);
    } else {
      setSortedRows(rows);
    }
  };

  const handleOrderBy = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newOrderBy = e.target.value as keyof RepoType;
    const num = order === "desc" ? 1 : -1;

    setOrderBy(newOrderBy);
    setSortedRows([
      ...sortedRows.sort((a, b) => {
        return a[newOrderBy] > b[newOrderBy] ? num * -1 : num;
      }),
    ]);
  };

  const handleOrderSwitch = () => {
    const newOrder = order === "asc" ? "desc" : "asc";
    const newNum = newOrder === "desc" ? 1 : -1;
    const newOrderBy = orderBy as keyof RepoType;

    setOrder(newOrder);
    setSortedRows([
      ...sortedRows.sort((a, b) => {
        return a[newOrderBy] > b[newOrderBy] ? newNum * -1 : newNum;
      }),
    ]);
  };

  return (
    <div className="p-4">
      <div>
        <input type="text" placeholder="Filter items" onChange={handleFilter} />
        <select onChange={handleOrderBy}>
          {Object.keys(rows[0]).map((category, idx) => (
            <option value={category} key={idx}>
              Order by {formatString(category)}
            </option>
          ))}
        </select>
        <button onClick={handleOrderSwitch}>Switch order ({order})</button>
      </div>
      <table className="table-fixed border-separate border-spacing-6 border border-indigo-400">
        <thead>
          <tr>
            {Object.keys(rows[0]).map((category, idx) => (
              <th key={idx}>{formatString(category)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedRows.map((row, idx) => {
            return (
              <tr key={idx}>
                {Object.values(row).map((item, colIdx) => (
                  <td key={colIdx}>{String(item)}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
