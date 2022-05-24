// Dependencies
import React, { useRef, useCallback, useState } from "react";
import { useSortBy, useTable } from "react-table";

// Assets
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
  HeaderRow,
  TextContainer,
  IconContainer,
} from "./styles";

// Components
import IconButton from "components/inputs/IconButton";
import CheckBox from "components/inputs/CheckBox";
import Typography from "components/display/Typography";

// Types
import { TableProps } from "./types";
import { dark } from "theme";

const Table = ({
  columns = [],
  data = [],
  onColumnHidden = () => {},
  defaultHiddenColumns,
  hideOptionsButton,
  isUserTable,
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
        <TableView isUserTable={isUserTable} {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup: any, index: number) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={`--table-head-${index.toString()}`}>
                {headerGroup.headers.map((column: any, index: number) => (
                  <ThView
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={`--table-head-row-${index.toString()}`}
                    isSorted={column.isSorted}
                  >
                    <HeaderRow>
                      <TextContainer>
                        <Typography color={"neutral200"} variant={"body2"} weight={"regular"}>
                          {column.render("Header")}
                        </Typography>
                        <Typography color={"neutral400"} variant={"h5"} weight={"regular"}>
                          {column.render("Footer")}
                        </Typography>
                      </TextContainer>
                      <IconContainer>
                        {index < headerGroup.headers.length && (
                          <SortIcon
                            color={dark["neutral200"]}
                            isSorted={column.isSorted}
                            isSortedDesc={column.isSortedDesc}
                            width={24}
                            height={24}
                          />
                        )}
                      </IconContainer>
                    </HeaderRow>
                  </ThView>
                ))}
                <th role={"row"}>
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    {!hideOptionsButton && (
                      <IconButton
                        variant={"flat"}
                        icon={<OptionsDotsIcon color={dark["neutral200"]} />}
                        dropDownOptions={{
                          componentOverflowRef: tableRef,
                          alignment: "right",
                        }}
                        renderDropDown={renderColumnsSelector()}
                      />
                    )}
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
                      <Typography variant="body2" weight="medium" color="neutral200">
                        {cell.render("Cell")}
                      </Typography>
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
