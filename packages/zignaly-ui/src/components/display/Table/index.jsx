// Dependencies
import React from 'react';
import { useTable, useSortBy } from 'react-table';

// Assets
import ArrowBottomIcon from '@assets/icons/arrow-bottom-icon.svg';

// Styles
import * as styled from './index.styles';

function Table({
  columns = [],
  data = []
}) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({
    columns,
    data
  }, useSortBy);

  const firstPageRows = rows.slice(0, 20);

  return (
    <styled.Layout {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup, index) => (
          <tr
            key={`--table-head-${index.toString()}`}
            {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column, index) => (
              <th key={`--table-head-row-${index.toString()}`} {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render('Header')}
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
          return (
            <tr key={`--table-row-${i.toString()}`} {...row.getRowProps()}>
              {row.cells.map((cell, index) => (
                <td
                  key={`--table-row-cell-${index.toString()}`}
                  {...cell.getCellProps()}>
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </styled.Layout>
  );
}

export default Table;
