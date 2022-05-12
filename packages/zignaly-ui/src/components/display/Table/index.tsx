// Dependencies
import React, { useRef, useCallback, useState } from "react";
import { useSortBy, useTable } from "react-table";

// Assets
import ArrowBottomWhiteIcon from "assets/icons/arrow-bottom-icon-white.svg?url";
import OptionsDotsIcon from "assets/icons/option-dots-icon.svg";

// Styles
import {
  Layout,
  OptionItem,
  OptionList,
  SortIcon,
  TableView,
  View,
  ThView,
  ColumnsSelector,
} from "./styles";

// Components
import IconButton from "components/inputs/IconButton";
import CheckBox from "components/inputs/CheckBox";
import Typography from "components/display/Typography";

// Types
import { TableProps } from "./types";

const Table = ({
  columns = [],
  data = [],
  onColumnHidden = () => {},
  defaultHiddenColumns,
}: TableProps) => {
  // Refs
  const tableRef = useRef(null);

  // States
  const [hiddenColumns, setHiddenColumns] = useState<string[]>(defaultHiddenColumns || []);

  // Hooks
  const { getTableProps, getTableBodyProps, rows, headerGroups, toggleHideColumn, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useSortBy,
    );

  const firstPageRows = rows.slice(0, 20);

  /**
   * @function renderActionRow():
   * @description Inject the action row on "column options" column.
   */
  const renderActionRow = useCallback(
    (row: any, index: number) => {
      if (data.find((e: any) => e.action)) {
        return (
          <td className={"action"} key={`--table-row-cell-${index.toString()}`}>
            {/*@ts-ignore*/}
            {data[row.index].action}
          </td>
        );
      }
    },
    [data],
  );

  const hideColumn = (column: string) => {
    setHiddenColumns((prevState: any[]) => {
      return [...prevState, column];
    });
    onColumnHidden(column, true);
  };

  const showColumn = (column: string) => {
    setHiddenColumns((prevState) => prevState.filter((e) => e !== column));
    onColumnHidden(column, false);
  };

  const renderColumnsSelector = useCallback(() => {
    return (
      <ColumnsSelector>
        <Typography>Show/Hide Columns</Typography>
        <OptionList>
          {columns.map((column: any, index) => {
            const isDisabled =
              hiddenColumns.length >= columns.length - 2 &&
              !hiddenColumns.find((e) => e === column.accessor);

            const isActive = !hiddenColumns.find((e) => e === column.accessor);

            return (
              <OptionItem key={`--options-container-${index.toString()}`}>
                <CheckBox
                  value={isActive}
                  label={column.Header ?? ""}
                  onChange={(isActive: boolean) => {
                    toggleHideColumn(column.accessor, !isActive);
                    if (!isActive) {
                      hideColumn(column.accessor);
                    } else {
                      showColumn(column.accessor);
                    }
                  }}
                  disabled={isDisabled}
                />
              </OptionItem>
            );
          })}
        </OptionList>
      </ColumnsSelector>
    );
  }, [columns, hiddenColumns]);

  return (
    <Layout>
      <View ref={tableRef}>
        <TableView {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup: any, index: number) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={`--table-head-${index.toString()}`}>
                {headerGroup.headers.map((column: any, index: number) => (
                  <ThView
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={`--table-head-row-${index.toString()}`}
                    isSorted={column.isSorted}
                    isAlignRight={column.isAlignThRight}
                  >
                    <Typography color={"neutral200"} variant={"h4"} weight={"regular"}>
                      {column.render("Header")}
                    </Typography>
                    {index < headerGroup.headers.length - 1 && (
                      <SortIcon
                        isSorted={column.isSorted}
                        isSortedDesc={column.isSortedDesc}
                        src={ArrowBottomWhiteIcon}
                      />
                    )}
                  </ThView>
                ))}
                <th role={"row"}>
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <IconButton
                      variant={"flat"}
                      icon={<OptionsDotsIcon />}
                      dropDownOptions={{
                        componentOverflowRef: tableRef,
                        alignment: "right",
                      }}
                      renderDropDown={renderColumnsSelector()}
                    />
                  </div>
                </th>
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {firstPageRows.map((row: any, index: number) => {
              prepareRow(row);
              return (
                <tr key={`--firstPageRows-${index.toString()}`} {...row.getRowProps()}>
                  {row.cells.map((cell: any, index: number) => (
                    <td
                      className={cell.column.id === "action" ? "action" : "row-td"}
                      {...cell.getCellProps()}
                      key={`--table-row-cell-${index.toString()}`}
                    >
                      <Typography color={"neutral100"}>{cell.render("Cell")}</Typography>
                    </td>
                  ))}
                  {renderActionRow(row, index)}
                </tr>
              );
            })}
          </tbody>
        </TableView>
      </View>
    </Layout>
  );
};

export default Table;
