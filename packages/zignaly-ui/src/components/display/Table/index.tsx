// Dependencies
import React, { useRef, useCallback, useState } from "react";
import { useSortBy, useTable } from "react-table";

// Assets
import ArrowBottomWhiteIcon from "assets/icons/arrow-bottom-icon-white.svg?url";
import OptionsDotsIcon from "assets/icons/option-dots-icon.svg?url";

// Styles
import { Layout, OptionItem, OptionList, SortIcon, TableView, View, ThView } from "./styles";

// Components
import IconButton from "components/inputs/IconButton";
import CheckBox from "components/inputs/CheckBox";

const Table = ({ columns = [], data = [] }: { columns: any[]; data: Object[] }) => {
  // Refs
  const tableRef = useRef(null);

  // States
  const [hiddenColumns, setHiddenColumns] = useState([]);

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
                    {column.render("Header")}
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
                      icon={OptionsDotsIcon}
                      dropDownOptions={{
                        componentOverflowRef: tableRef,
                        alignment: "right",
                      }}
                      renderDropDown={
                        <OptionList>
                          {columns.map((column: any, index) => {
                            const isDisabled =
                              hiddenColumns.length >= columns.length - 2 &&
                              !hiddenColumns.find((e) => e === column.accessor);

                            const isActive =
                              hiddenColumns.find((e) => e === column.accessor) ?? true;

                            return (
                              <OptionItem key={`--options-container-${index.toString()}`}>
                                <CheckBox
                                  value={isActive}
                                  label={column.Header ?? ""}
                                  onChange={(isActive: boolean) => {
                                    toggleHideColumn(column.accessor, !isActive);
                                    if (!isActive) {
                                      // @ts-ignore
                                      setHiddenColumns((prevState: any[]) => {
                                        return [...prevState, column.accessor];
                                      });
                                    } else {
                                      setHiddenColumns((prevState) =>
                                        prevState.filter((e) => e !== column.accessor),
                                      );
                                    }
                                  }}
                                  disabled={isDisabled}
                                />
                              </OptionItem>
                            );
                          })}
                        </OptionList>
                      }
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
                      {cell.render("Cell")}
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
