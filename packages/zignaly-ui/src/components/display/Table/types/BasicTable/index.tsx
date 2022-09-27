import React, { useCallback, useRef, useState } from "react";
import { useSortBy, useTable } from "react-table";
import {
  ColumnsSelector,
  EmptyMessage,
  HeaderRow,
  IconContainer,
  Layout,
  OptionItem,
  OptionList,
  SortIcon,
  TableView,
  TextContainer,
  ThView,
  View,
} from "../../styles";
import { dark } from "../../../../../theme";
import Typography from "../../../Typography";
import CheckBox from "../../../../inputs/CheckBox";
import IconButton from "../../../../inputs/IconButton";
import { ReactComponent as OptionsDotsIcon } from "../../../../../assets/icons/option-dots-icon.svg";
import { TableBasicProps } from "../../types";
import DropDown from "../../../DropDown";

export default function BasicTable<T extends object>({
  columns = [],
  data = [],
  onColumnHidden = () => {},
  defaultHiddenColumns,
  hideOptionsButton,
  isUserTable,
  initialState = {},
  emptyMessage,
  hasFooter = false,
}: TableBasicProps<T>) {
  const tableRef = useRef(null);

  // States
  const [hiddenColumns, setHiddenColumns] = useState<string[]>(defaultHiddenColumns || []);

  const {
    getTableProps,
    getTableBodyProps,
    rows,
    headerGroups,
    footerGroups,
    toggleHideColumn,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      initialState,
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
      } else if (!hideOptionsButton) {
        return (
          <td className={"action"} key={`--table-row-cell-${index.toString()}`}>
            {/*@ts-ignore*/}
            {""}
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
                          {column.headerWithFooter}
                        </Typography>
                      </TextContainer>
                      <IconContainer>
                        {index < headerGroup.headers.length && (
                          <SortIcon
                            color={dark.neutral200}
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
                      <DropDown
                        component={({ open }) => (
                          <IconButton
                            variant={"flat"}
                            isFocused={open}
                            icon={<OptionsDotsIcon color={dark.neutral200} />}
                          />
                        )}
                        options={columns.map((column: any) => {
                          const isDisabled =
                            hiddenColumns.length >= columns.length - 2 &&
                            !hiddenColumns.find((e) => e === column.accessor);

                          const isActive = !hiddenColumns.find((e) => e === column.accessor);

                          return {
                            element: (
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
                            ),
                          };
                        })}
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
          {hasFooter && (
            <tfoot>
              {footerGroups.map((group: any, index: number) => (
                <tr {...group.getFooterGroupProps()} key={`--table-foot-${index.toString()}`}>
                  {group.headers.map((column: any, index: number) => (
                    <td {...column.getFooterProps()} key={`--table-foot-cell-${index.toString()}`}>
                      {column.render("Footer")}
                    </td>
                  ))}
                  <td
                    className={"action"}
                    key={`--table-foot-cell-${group.headers.length.toString()}`}
                  >
                    {""}
                  </td>
                </tr>
              ))}
            </tfoot>
          )}
        </TableView>
        {!data.length && <EmptyMessage>{emptyMessage}</EmptyMessage>}
      </View>
    </Layout>
  );
}
