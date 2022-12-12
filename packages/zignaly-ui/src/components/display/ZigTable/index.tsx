import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  PluginHook,
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
  Layout,
  SortIcon,
  TableView,
  TextContainer,
  ThView,
  View,
} from "./styles";

import { ReactComponent as OptionsDotsIcon } from "assets/icons/option-dots-icon.svg";
import { ReactComponent as SingleChevron } from "assets/icons/chevron-small-icon.svg";
import { ReactComponent as DoubleChevron } from "assets/icons/double-chevron-small-icon.svg";
import {
  FooterContainer,
  IconButtonContainer,
  PageNumberContainer,
  SelectorContainer,
  SelectorSizing,
} from "./styles";
import DropDown from "../DropDown";
import ZigTypography from "../ZigTypography";
import IconButton from "../../inputs/IconButton";
import CheckBox from "../../inputs/CheckBox";
import { ZigTableProps } from "./types";
import Selector from "components/inputs/Selector";
import { Box } from "@mui/material";

export default function ZigTable<T extends object>({
  columns = [],
  data = [],
  onColumnHidden = () => {},
  defaultHiddenColumns,
  hideOptionsButton,
  emptyMessage,
  initialState = {},
  pagination = true,
  renderRowSubComponent,
}: ZigTableProps<T>) {
  const tableRef = useRef(null);
  const [hiddenColumns, setHiddenColumns] = useState<string[]>(defaultHiddenColumns || []);

  const plugins = [useSortBy] as PluginHook<T>[];
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

  const customOptions = [
    { index: 0, caption: "10" },
    { index: 1, caption: "20" },
    { index: 2, caption: "30" },
    { index: 3, caption: "40" },
    { index: 4, caption: "50" },
  ];

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
                          <SortIcon
                            color="neutral200"
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
                            icon={<OptionsDotsIcon color="neutral200" />}
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
                <>
                  <tr
                    // key={`--firstPageRows-${index.toString()}`}
                    {...row.getRowProps()}
                    {...(renderRowSubComponent && row.getToggleRowExpandedProps({}))}
                  >
                    {row.cells.map((cell: any, index: number) => (
                      <td
                        className={cell.column.id === "action" ? "action" : "row-td"}
                        {...cell.getCellProps()}
                        key={`--table-row-cell-${index.toString()}`}
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
                      <td colSpan={visibleColumns.length} style={{ border: "none" }}>
                        {renderRowSubComponent!(row)}
                      </td>
                    </tr>
                  ) : null}
                </>
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
      {pagination && (
        <FooterContainer>
          <Box display="flex" gap={2}>
            <ZigTypography variant="body1" color="neutral300">
              Showing
            </ZigTypography>
            <ZigTypography variant="body1" color="neutral100">
              {pageIndex + 1}
            </ZigTypography>
            <ZigTypography variant="body1" color="neutral300">
              out of
            </ZigTypography>
            <ZigTypography variant="body1" color="neutral100">
              {pageOptions.length}
            </ZigTypography>
            <ZigTypography variant="body1" color="neutral300">
              items
            </ZigTypography>
          </Box>
          <Box justifyContent="center" display="flex" gap={2}>
            <IconButtonContainer
              variant="flat"
              size="xlarge"
              rotate={true}
              shrinkWrap={true}
              icon={<DoubleChevron width={24} height={24} color="neutral300" />}
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            />
            <IconButtonContainer
              variant="flat"
              size="xlarge"
              rotate={true}
              shrinkWrap={true}
              icon={<SingleChevron width={24} height={24} color="neutral300" />}
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            />
            <ZigTypography variant="body1" color="neutral300">
              Page
            </ZigTypography>
            <PageNumberContainer>
              <ZigTypography variant="h3" color="neutral100">
                {pageIndex + 1}
              </ZigTypography>
            </PageNumberContainer>
            <ZigTypography variant="body1" color="neutral300">
              out of
            </ZigTypography>
            <ZigTypography variant="body1" color="neutral100" fontWeight={600}>
              {pageOptions.length}
            </ZigTypography>
            <IconButtonContainer
              variant="flat"
              size="xlarge"
              shrinkWrap={true}
              onClick={() => nextPage()}
              disabled={!canNextPage}
              icon={<SingleChevron width={24} height={24} color="neutral300" />}
            />
            <IconButtonContainer
              variant="flat"
              size="xlarge"
              shrinkWrap={true}
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
              icon={<DoubleChevron width={24} height={24} color="neutral300" />}
            />
          </Box>
          <Box justifyContent="end" display="flex" gap={2}>
            {data.length > 10 && (
              <SelectorContainer>
                <ZigTypography variant="body1" color="neutral300">
                  Displaying
                </ZigTypography>
                <SelectorSizing>
                  <Selector
                    options={customOptions}
                    placeholder={
                      <ZigTypography variant="h3" color="neutral100">
                        {pageSize}
                      </ZigTypography>
                    }
                    maxHeight={36}
                    onChange={(e: { caption: string }) => {
                      setPageSize(Number(e.caption));
                    }}
                  />
                </SelectorSizing>
                <ZigTypography variant="body1" color="neutral300">
                  items
                </ZigTypography>
              </SelectorContainer>
            )}
          </Box>
        </FooterContainer>
      )}
    </Layout>
  );
}
