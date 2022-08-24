import React, { useCallback, useRef, useState } from "react";
import { usePagination, useSortBy, useTable } from "react-table";

// Styles
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

// Components
import Typography from "../../../Typography";
import CheckBox from "../../../../inputs/CheckBox";
import IconButton from "../../../../inputs/IconButton";

// Assets
import { ReactComponent as OptionsDotsIcon } from "../../../../../assets/icons/option-dots-icon.svg";
import { ReactComponent as SingleChevron } from "assets/icons/chevron-small-icon.svg";
import { ReactComponent as DoubleChevron } from "assets/icons/double-chevron-small-icon.svg";

// Types
import { TableBasicProps } from "../../types";
import {
  FooterContainer,
  IconButtonContainer,
  PageNumberContainer,
  Row,
  SelectorContainer,
  SelectorSizing,
} from "./styles";
import Selector from "components/inputs/Selector";

export default function PagedWithDataTable({
  columns = [],
  data = [],
  onColumnHidden = () => {},
  defaultHiddenColumns,
  hideOptionsButton,
  isUserTable,
  emptyMessage,
  initialState = {},
  hasFooter = true,
}: TableBasicProps) {
  // Refs
  const tableRef = useRef(null);

  // States
  const [hiddenColumns, setHiddenColumns] = useState<string[]>(defaultHiddenColumns || []);

  // Hooks
  // @ts-ignore
  const {
    getTableProps,
    getTableBodyProps,
    // @ts-ignore
    page,
    headerGroups,
    toggleHideColumn,
    prepareRow,
    // @ts-ignore
    gotoPage,
    // @ts-ignore
    nextPage,
    // @ts-ignore
    previousPage,
    // @ts-ignore
    canNextPage,
    // @ts-ignore
    canPreviousPage,
    // @ts-ignore
    pageOptions,
    // @ts-ignore
    pageCount,
    // @ts-ignore
    setPageSize,
    // @ts-ignore
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState,
    },
    useSortBy,
    usePagination,
  );

  //const propsBasisUseTable = { getTableProps, getTableBodyProps, headerGroups, prepareRow, toggleHideColumn, page, gotoPage, nextPage, previousPage, canNextPage, canPreviousPage, pageOptions, state: { pageIndex } };

  //const firstPageRows = rows.slice(0, 20);

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
                      <IconButton
                        variant={"flat"}
                        icon={<OptionsDotsIcon color={dark.neutral200} />}
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
            {page.map((row: any, index: number) => {
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
        {!data.length && <EmptyMessage>{emptyMessage}</EmptyMessage>}
        {hasFooter && (
          <FooterContainer>
            <Row justifyContent="start">
              <Typography variant="body1" color="neutral300" weight="regular">
                Showing
              </Typography>
              <Typography variant="body1" color="neutral100">
                {pageIndex + 1}
              </Typography>
              <Typography variant="body1" color="neutral300" weight="regular">
                out of
              </Typography>
              <Typography variant="body1" color="neutral100">
                {pageOptions.length}
              </Typography>
              <Typography variant="body1" color="neutral300" weight="regular">
                items
              </Typography>
            </Row>
            <Row justifyContent="center">
              <IconButtonContainer
                variant="flat"
                size="xlarge"
                rotate={true}
                shrinkWrap={true}
                icon={<DoubleChevron width={24} height={24} color={dark.neutral300} />}
                onClick={() => gotoPage(0)}
                disabled={!canPreviousPage}
              ></IconButtonContainer>
              <IconButtonContainer
                variant="flat"
                size="xlarge"
                rotate={true}
                shrinkWrap={true}
                icon={<SingleChevron width={24} height={24} color={dark.neutral300} />}
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              ></IconButtonContainer>
              <Typography variant="body1" weight="regular" color="neutral300">
                Page
              </Typography>
              <PageNumberContainer>
                <Typography variant="h3" color="neutral100">
                  {pageIndex + 1}
                </Typography>
              </PageNumberContainer>
              <Typography variant="body1" weight="regular" color="neutral300">
                out of
              </Typography>
              <Typography variant="body1" color="neutral100" weight="demibold">
                {pageOptions.length}
              </Typography>
              <IconButtonContainer
                variant="flat"
                size="xlarge"
                shrinkWrap={true}
                onClick={() => nextPage()}
                disabled={!canNextPage}
                icon={<SingleChevron width={24} height={24} color={dark.neutral300} />}
              ></IconButtonContainer>
              <IconButtonContainer
                variant="flat"
                size="xlarge"
                shrinkWrap={true}
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
                icon={<DoubleChevron width={24} height={24} color={dark.neutral300} />}
              ></IconButtonContainer>
            </Row>
            <Row justifyContent="end">
              {data.length > 10 && (
                <SelectorContainer>
                  <Typography variant="body1" weight="regular" color="neutral300">
                    Displaying
                  </Typography>
                  <SelectorSizing>
                    <Selector
                      options={customOptions}
                      placeholder={
                        <Typography variant="h3" color="neutral100">
                          {pageSize}
                        </Typography>
                      }
                      maxHeight={36}
                      onChange={(e: { caption: string }) => {
                        setPageSize(Number(e.caption));
                      }}
                    />
                  </SelectorSizing>
                  <Typography variant="body1" weight="regular" color="neutral300">
                    items
                  </Typography>
                </SelectorContainer>
              )}
            </Row>
          </FooterContainer>
        )}
      </View>
    </Layout>
  );
}
