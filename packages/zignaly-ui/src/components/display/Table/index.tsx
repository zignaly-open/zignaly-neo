// Dependencies
import React from "react";
import { useTable, useSortBy, Column } from "react-table";

// Assets
import ArrowBottomIcon from "@assets/icons/arrow-bottom-icon.svg";

// Styles
import * as styled from "./styles";

// Components
import Row from "./components/Row";

const Table = ({ columns = [], data = [] }: { columns: Column<any>[]; data: Object[] }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
    },
    useSortBy,
  );

  const firstPageRows = rows.slice(0, 20);

  return (
    <styled.Layout>
      <styled.Table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, index) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={`--table-head-${index.toString()}`}>
              {headerGroup.headers.map((column, index) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  key={`--table-head-row-${index.toString()}`}
                >
                  {column.render("Header")}
                  {column.isSorted && (
                    <styled.SortIcon isSortedDesc={column.isSortedDesc} src={ArrowBottomIcon} />
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {firstPageRows.map((row, i) => {
            prepareRow(row);

            return <Row row={row} {...row.getRowProps()} key={`--table-row-${i.toString()}`} />;
          })}
        </tbody>
      </styled.Table>
    </styled.Layout>
  );
};

export default Table;
