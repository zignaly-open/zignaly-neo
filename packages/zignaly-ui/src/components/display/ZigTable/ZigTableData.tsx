import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  SortingState,
  getSortedRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { TableContainer, HeaderIconButton, SmallSelectWrapper, SortBox, HeaderBox } from "./styles";
import ZigDropdown from "../ZigDropdown";
import ZigTypography from "../ZigTypography";
import { ZigTablePropsData } from "./types";
import { Box, IconButton, useTheme } from "@mui/material";
import { ChevronLeft, ChevronRight, FirstPage, LastPage } from "@mui/icons-material";
import ZigSelect from "components/inputs/ZigSelect";
import { Table, SortIcon } from "./styles";
import { Loader } from "../Loader";
import { ZigDotsVerticalIcon } from "../../../icons";
import { useUpdateEffect } from "react-use";
import { ZigCheckBox } from "../../../index";

function ZigTableData<T extends object>({
  prefixId,
  data,
  columns,
  initialState = {},
  columnVisibility: enableColumnVisibility = true,
  defaultHiddenColumns = [],
  renderSubComponent,
  pagination,
  loading,
  onRowClick,
  fetching,
  emptyMessage,
  state = {},
  onSortingChange,
  sorting,
  ...rest
}: ZigTablePropsData<T>) {
  const theme = useTheme();
  const [internalSorting, setInternalSorting] = React.useState<SortingState>(
    initialState.sorting ?? [],
  );
  useUpdateEffect(() => {
    onSortingChange?.(internalSorting);
  }, [internalSorting]);

  const [columnVisibility, setColumnVisibility] = React.useState(
    Object.assign({}, ...defaultHiddenColumns.map((c) => ({ [c]: false }))),
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting: sorting ?? internalSorting,
      columnVisibility,
      ...(pagination && { pagination }),
      ...state,
    },
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: setInternalSorting,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    ...(pagination !== false && { getPaginationRowModel: getPaginationRowModel() }),
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand: () => !!renderSubComponent,
    getFilteredRowModel: getFilteredRowModel(),
    sortDescFirst: true,
    globalFilterFn: (row, columnId, filterValue) => {
      const value = row.getValue(columnId);
      const safeValue = typeof value === "number" ? String(value) : value;

      return (safeValue as string)?.toLocaleLowerCase().includes(filterValue.toLocaleLowerCase());
    },
    ...rest,
  });

  const pageSizeOptions = [10, 20, 30, 40, 50].map((o) => ({ value: o, label: o.toString() }));

  return (
    <>
      <TableContainer>
        <Table id={prefixId && `${prefixId}__table`} fetching={fetching}>
          <thead>
            {table.getHeaderGroups().map((headerGroup, groupIndex) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      id={
                        typeof header?.column?.columnDef?.header === "string"
                          ? prefixId &&
                            `${prefixId}-table__header-${header.column.columnDef.header
                              .toString()
                              .replace(/ /g, "")}`
                          : header?.column?.columnDef?.id &&
                            `${prefixId}-table__header-${header.column.columnDef.id}`
                      }
                    >
                      {!header.isPlaceholder && (
                        <HeaderBox>
                          <SortBox
                            canSort={header.column.getCanSort()}
                            onClick={header.column.getToggleSortingHandler()}
                            style={header.column.columnDef.style}
                          >
                            <div>
                              <ZigTypography color="neutral200" variant="body2">
                                {flexRender(header.column.columnDef.header, header.getContext())}
                              </ZigTypography>
                              {header.column.columnDef.meta?.subtitle && (
                                <ZigTypography color="neutral300" component="p" variant="caption">
                                  {flexRender(
                                    header.column.columnDef.meta.subtitle,
                                    header.getContext(),
                                  )}
                                </ZigTypography>
                              )}
                            </div>
                            {header.column.getCanSort() && (
                              <SortIcon
                                isSorted={header.column.getIsSorted()}
                                id={prefixId && `${prefixId}-table__sorted-icon`}
                              />
                            )}
                          </SortBox>
                        </HeaderBox>
                      )}
                    </th>
                  );
                })}

                {enableColumnVisibility && table.getHeaderGroups().length === groupIndex + 1 && (
                  <th style={{ width: "50px" }}>
                    <ZigDropdown
                      component={() => (
                        <HeaderIconButton id={prefixId && `${prefixId}-table__popover-filter`}>
                          <ZigDotsVerticalIcon
                            color={theme.palette.neutral200}
                            height={16}
                            width={16}
                          />
                        </HeaderIconButton>
                      )}
                      options={table
                        .getAllLeafColumns()
                        .filter(
                          (c) =>
                            c.columnDef.header &&
                            typeof c.columnDef.header === "string" &&
                            c.getCanHide(),
                        )
                        .map((column) => {
                          return {
                            element: (
                              <ZigCheckBox
                                variant={"outlined"}
                                checked={column.getIsVisible()}
                                label={column.columnDef.header as string}
                                onChange={(v) => {
                                  if (
                                    v.target.checked ||
                                    table.getVisibleLeafColumns().length > 2
                                  ) {
                                    column.toggleVisibility(v.target.checked);
                                  }
                                }}
                              />
                            ),
                          };
                        })}
                    />
                  </th>
                )}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => {
              return (
                <React.Fragment key={row.id}>
                  <tr
                    onClick={() => {
                      onRowClick?.(row.id);
                      row.getCanExpand() && row.getToggleExpandedHandler()();
                    }}
                    style={{
                      cursor: onRowClick || row.getCanExpand() ? "pointer" : "unset",
                      position: "relative",
                      transform: "scale(1)",
                    }}
                  >
                    {row.getVisibleCells().map((cell, index) => {
                      return (
                        <td
                          key={cell.id}
                          colSpan={
                            enableColumnVisibility && row.getVisibleCells().length === index + 1
                              ? 2
                              : undefined
                          }
                        >
                          <ZigTypography fontWeight="medium" color="neutral200">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </ZigTypography>
                        </td>
                      );
                    })}
                  </tr>
                  {row.getIsExpanded() && (
                    <tr style={{ border: "none", padding: "0 14px" }}>
                      <td colSpan={row.getVisibleCells().length + +!!enableColumnVisibility}>
                        {renderSubComponent!({ row })}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </Table>
      </TableContainer>
      {!data.length && !loading && (
        <ZigTypography
          variant="body1"
          textAlign="center"
          padding="72px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          id={"table__empty-message"}
        >
          {emptyMessage}
        </ZigTypography>
      )}
      {pagination !== false && (
        <Box p="22px" display="flex" alignItems="center" justifyContent="center" flexWrap="wrap">
          <Box display={["none", "flex"]} flex={3} justifyContent="flex-start" />
          <Box justifyContent="center" display="flex" gap={1} alignItems="center" flex={3}>
            <IconButton
              id={prefixId && `${prefixId}-table__go-zero-page`}
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <FirstPage width={24} height={24} />
            </IconButton>
            <IconButton
              id={prefixId && `${prefixId}-table__go-previous-page`}
              onClick={table.previousPage}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft width={24} height={24} />
            </IconButton>
            <Box
              display="flex"
              gap={1}
              alignItems="center"
              px={2}
              id={prefixId && `${prefixId}-table__pages`}
            >
              <ZigTypography color="neutral300">Page</ZigTypography>

              <ZigTypography variant="h3" color="neutral100">
                {table.getState().pagination.pageIndex + 1}
              </ZigTypography>

              {table.getPageCount() !== -1 && (
                <>
                  <ZigTypography whiteSpace="nowrap" color="neutral300">
                    out of
                  </ZigTypography>
                  <ZigTypography
                    color="neutral100"
                    fontWeight={600}
                    id={prefixId && `${prefixId}-table__total-page-count`}
                  >
                    {table.getPageCount() || 1}
                  </ZigTypography>
                </>
              )}
            </Box>
            {loading && <Loader width={24} height={24} />}
            <IconButton
              id={prefixId && `${prefixId}-table__go-next-page`}
              onClick={table.nextPage}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRight width={24} height={24} />
            </IconButton>

            {table.getPageCount() !== -1 && (
              <IconButton
                id={prefixId && `${prefixId}-table__go-last-page`}
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <LastPage width={24} height={24} />
              </IconButton>
            )}
          </Box>
          <Box
            flex={3}
            display="flex"
            gap={2}
            alignItems="center"
            justifyContent={["center", "flex-end"]}
            marginTop={[1, 0]}
          >
            <ZigTypography color="neutral300">Displaying</ZigTypography>
            <SmallSelectWrapper>
              <ZigSelect
                menuPlacement={"top"}
                id={prefixId && `${prefixId}-table__items-per-page`}
                options={pageSizeOptions}
                value={table.getState().pagination.pageSize}
                onChange={table.setPageSize}
              />
            </SmallSelectWrapper>
            <ZigTypography color="neutral300">items</ZigTypography>
          </Box>
        </Box>
      )}
      {rest.debugTable && <pre>{JSON.stringify(table.getState(), null, 2)}</pre>}
    </>
  );
}

export default ZigTableData;
