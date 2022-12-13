import React, { useCallback, useEffect, useState } from "react";
import {
  Row,
  useExpanded,
  UseExpandedRowProps,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import {
  EmptyMessage,
  HeaderRow,
  IconContainer,
  SortIcon,
  TableView,
  TextContainer,
  ThView,
  View,
} from "./styles";

import { ReactComponent as OptionsDotsIcon } from "assets/icons/option-dots-icon.svg";
import { ReactComponent as SingleChevron } from "assets/icons/chevron-small-icon.svg";
import { ReactComponent as DoubleChevron } from "assets/icons/double-chevron-small-icon.svg";
import { FooterContainer, PageNumberContainer, SelectorContainer, SelectorSizing } from "./styles";
import DropDown from "../DropDown";
import ZigTypography from "../ZigTypography";
import IconButton from "../../inputs/IconButton";
import CheckBox from "../../inputs/CheckBox";
import { ZigTableProps } from "./types";
import { Box, useTheme } from "@mui/material";
import { ExpandLess, ExpandMore, FirstPage, LastPage } from "@mui/icons-material";
import ZigSelect from "components/inputs/ZigSelect";
export default function ZigTable<T extends object>() {
  return null;
}

export function ZigTable2<T extends object>({
  columns = [],
  data = [],
  onColumnHidden = () => {},
  defaultHiddenColumns,
  hideOptionsButton,
  emptyMessage,
  initialState = {},
  pagination = true,
  sort = true,
  renderRowSubComponent,
}: ZigTableProps<T>) {
  const [hiddenColumns, setHiddenColumns] = useState<string[]>(defaultHiddenColumns || []);
  const theme = useTheme();

  const plugins = [];
  if (sort) {
    plugins.push(useSortBy);
  }
  if (pagination) {
    plugins.push(usePagination);
  }
  if (renderRowSubComponent) {
    plugins.push(useExpanded);
  }

  const {
    getTableProps,
    getTableBodyProps,
    rows,
    page,
    headerGroups,
    footerGroups,
    toggleHideColumn,
    prepareRow,
    gotoPage,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    pageCount,
    setPageSize,
    state: { pageIndex, pageSize },
    visibleColumns,
  } = useTable(
    {
      columns,
      data,
      initialState,
    },
    ...plugins,
  );

  useEffect(() => {
    defaultHiddenColumns?.forEach((c) => toggleHideColumn(c, true));
  }, []);

  /**
   * @function renderActionRow():
   * @description Inject the action row on "column options" column.
   */
  const renderActionRow = useCallback(
    (row: any, index: number) => {
      const hasAction = data.find((e: any) => e.action);
      if (hasAction || !hideOptionsButton) {
        return (
          <td className={"action"} key={`--table-row-cell-${index.toString()}`}>
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

  const pageSizeOptions = [
    { value: 10, label: "10" },
    { value: 20, label: "20" },
    { value: 30, label: "30" },
    { value: 40, label: "40" },
    { value: 50, label: "50" },
  ];

  return (
    <>
      <View>
        <TableView {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup: any, index: number) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={`--table-head-${index.toString()}`}>
                {headerGroup.headers.map((column: any, index: number) => (
                  <ThView
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={`--table-head-row-${index.toString()}`}
                    isSorted={column.isSorted}
                  >
                    <HeaderRow style={column.style}>
                      <TextContainer>
                        <ZigTypography color={"neutral200"} variant={"body2"}>
                          {column.render("Header")}
                        </ZigTypography>
                        <ZigTypography color={"neutral400"} variant={"h5"}>
                          {column.headerWithFooter}
                        </ZigTypography>
                      </TextContainer>
                      <IconContainer>
                        {index < headerGroup.headers.length && (
                          <SortIcon isSorted={column.isSorted} isSortedDesc={column.isSortedDesc} />
                        )}
                      </IconContainer>
                    </HeaderRow>
                  </ThView>
                ))}
                <th role="columnheader">
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    {!hideOptionsButton && (
                      <DropDown
                        component={({ open }) => (
                          <IconButton
                            variant={"flat"}
                            isFocused={open}
                            icon={<OptionsDotsIcon color={theme.palette.neutral200} />}
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
            {(pagination ? page : rows).map((row: Row<T> & UseExpandedRowProps<T>, index) => {
              prepareRow(row);
              return (
                <React.Fragment key={`--table-body-row-${index.toString()}`}>
                  <tr
                    {...row.getRowProps()}
                    {...(renderRowSubComponent && row.getToggleRowExpandedProps())}
                  >
                    {row.cells.map((cell: any, index: number) => (
                      <td
                        {...cell.getCellProps()}
                        key={`--table-row-cell-${index.toString()}`}
                        sx={{ textAlign: cell.column.id === "action" ? "right" : "" }}
                      >
                        <ZigTypography variant="body2" fontWeight="medium" color="neutral200">
                          {cell.render("Cell")}
                        </ZigTypography>
                      </td>
                    ))}
                    {renderActionRow(row, index)}
                  </tr>
                  {row.isExpanded ? (
                    <tr>
                      <td
                        colSpan={visibleColumns.length}
                        style={{ border: "none", padding: "0 14px" }}
                      >
                        {renderRowSubComponent!(row)}
                      </td>
                    </tr>
                  ) : null}
                </React.Fragment>
              );
            })}
          </tbody>
          {footerGroups?.length && (
            <tfoot>
              {footerGroups.map((group: any, index: number) => (
                <tr {...group.getFooterGroupProps()} key={`--table-foot-${index.toString()}`}>
                  {group.headers.map((column: any, index: number) => (
                    <td {...column.getFooterProps()} key={`--table-foot-cell-${index.toString()}`}>
                      {column.render("Footer")}
                    </td>
                  ))}
                  <td key={`--table-foot-cell-${group.headers.length.toString()}`}></td>
                </tr>
              ))}
            </tfoot>
          )}
        </TableView>
        {/* {!data.length && <EmptyMessage>{emptyMessage}</EmptyMessage>} */}
      </View>
      {pagination && (
        <FooterContainer>
          <ZigTypography color="neutral300">
            Showing
            <ZigTypography color="neutral100">{page.length}</ZigTypography>
            out of
            <ZigTypography color="neutral100">{data.length}</ZigTypography>
            items
          </ZigTypography>
          <Box justifyContent="center" display="flex" gap={2}>
            <IconButton
              variant="flat"
              size="xlarge"
              shrinkWrap={true}
              icon={<FirstPage width={24} height={24} color="neutral300" />}
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            />
            <IconButton
              variant="flat"
              size="xlarge"
              shrinkWrap={true}
              icon={<SingleChevron width={24} height={24} color="neutral300" />}
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            />
            <ZigTypography color="neutral300">Page</ZigTypography>
            <PageNumberContainer>
              <ZigTypography variant="h3" color="neutral100">
                {pageIndex + 1}
              </ZigTypography>
            </PageNumberContainer>
            <ZigTypography color="neutral300">out of</ZigTypography>
            <ZigTypography color="neutral100" fontWeight={600}>
              {pageOptions.length}
            </ZigTypography>
            <IconButton
              variant="flat"
              size="xlarge"
              shrinkWrap={true}
              onClick={() => nextPage()}
              disabled={!canNextPage}
              icon={<SingleChevron width={24} height={24} color="neutral300" />}
            />
            <IconButton
              variant="flat"
              size="xlarge"
              shrinkWrap={true}
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
              icon={<DoubleChevron width={24} height={24} color="neutral300" />}
            />
          </Box>
          <Box justifyContent="end" display="flex" gap={2}>
            {data.length > pageSizeOptions[0].value && (
              <SelectorContainer>
                <ZigTypography color="neutral300">Displaying</ZigTypography>
                <SelectorSizing>
                  <ZigSelect
                    options={pageSizeOptions}
                    value={pageSize}
                    // maxHeight={36}
                    onChange={setPageSize}
                  />
                </SelectorSizing>
                <ZigTypography color="neutral300">items</ZigTypography>
              </SelectorContainer>
            )}
          </Box>
        </FooterContainer>
      )}
    </>
  );
}
