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
import { ZigCheckBox } from "../../../index";
import { Trans, useTranslation } from "react-i18next";

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
  onColumnVisibilityChange,
  sorting,
  ...rest
}: ZigTablePropsData<T>) {
  const theme = useTheme();
  const { t } = useTranslation("zignaly-ui", { keyPrefix: "ZigTable" });
  const [internalSorting, setInternalSorting] = React.useState<SortingState>(
    initialState.sorting ?? [],
  );

  const [internalColumnVisibility, setColumnVisibility] = React.useState(
    Object.assign({}, ...defaultHiddenColumns.map((c) => ({ [c]: false }))),
  );

  const properSorting = React.useMemo(() => {
    let sortingResult = internalSorting;
    // Controlled sorting
    if (sorting?.length) {
      // Make sure sorting columns exist or reset it
      sortingResult = sorting.filter((s) => columns.find((c) => c.id === s.id));
      if (!sortingResult.length) {
        sortingResult = initialState.sorting ?? [];
      }
    }
    return sortingResult;
  }, [sorting, internalSorting]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting: properSorting,
      columnVisibility: state.columnVisibility ?? internalColumnVisibility,
      ...(pagination && { pagination }),
      ...state,
    },
    onColumnVisibilityChange: state.columnVisibility
      ? onColumnVisibilityChange
      : setColumnVisibility,
    onSortingChange: sorting
      ? (v) => {
          onSortingChange?.((v as unknown as () => SortingState)());
        }
      : setInternalSorting,
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
                                sx={{ margin: "0 9px", padding: 0 }}
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
                          id={prefixId && `${prefixId}__${cell.column.id}-${cell.row.id}`}
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
      {!table?.getRowModel()?.rows?.length && !loading && (
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
              <Trans
                t={t}
                i18nKey={"page-x-of-all"}
                defaults="<text>Page</text> <current>{{currentPage}}</current> <text>out of</text> <total>{{totalPages}}</total>"
                values={{
                  currentPage: table.getState().pagination.pageIndex + 1,
                  totalPages: table.getPageCount() || 1,
                }}
                components={{
                  text: <ZigTypography whiteSpace="nowrap" color="neutral300" />,
                  current: (
                    <ZigTypography
                      variant="h3"
                      color="neutral100"
                      id={prefixId && `${prefixId}-table__current-page`}
                    />
                  ),
                  total: (
                    <ZigTypography
                      color="neutral100"
                      fontWeight={600}
                      id={prefixId && `${prefixId}-table__total-page-count`}
                    />
                  ),
                }}
              />
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
            <Trans
              t={t}
              i18nKey={"displaying-x-items"}
              defaults="<text>Displaying</text> <selector /> <text>items</text>"
              count={table.getState().pagination.pageSize}
              components={{
                text: <ZigTypography color="neutral300" />,
                selector: (
                  <SmallSelectWrapper>
                    <ZigSelect
                      menuPlacement={"top"}
                      id={prefixId && `${prefixId}-table__items-per-page`}
                      options={pageSizeOptions}
                      value={table.getState().pagination.pageSize}
                      onChange={table.setPageSize}
                    />
                  </SmallSelectWrapper>
                ),
                total: (
                  <ZigTypography
                    color="neutral100"
                    fontWeight={600}
                    id={prefixId && `${prefixId}-table__total-page-count`}
                  />
                ),
              }}
            />
          </Box>
        </Box>
      )}
      {rest.debugTable && <pre>{JSON.stringify(table.getState(), null, 2)}</pre>}
    </>
  );
}

export default ZigTableData;
