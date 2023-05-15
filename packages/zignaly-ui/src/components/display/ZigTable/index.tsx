import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  SortingState,
  getSortedRowModel,
  getExpandedRowModel,
} from "@tanstack/react-table";
import {
  TableContainer,
  HeaderIconButton,
  PageNumberContainer,
  SmallSelectWrapper,
  SortBox,
  FilterColumn,
} from "./styles";
import ZigDropdown from "../ZigDropdown";
import ZigTypography from "../ZigTypography";
import CheckBox from "../../inputs/CheckBox";
import { ZigTableProps } from "./types";
import { Box, IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight, FirstPage, LastPage, MoreVert } from "@mui/icons-material";
import ZigSelect from "components/inputs/ZigSelect";
import { Table, SortIcon } from "./styles";
import { Loader } from "../Loader";

export default function ZigTable<T extends object>({
  prefixId,
  data,
  columns,
  initialState = {},
  columnVisibility: enableColumnVisibility = true,
  defaultHiddenColumns = [],
  renderSubComponent,
  pagination,
  loading,
  emptyMessage,
  ...rest
}: ZigTableProps<T>) {
  const [sorting, setSorting] = React.useState<SortingState>(initialState.sorting ?? []);
  const [columnVisibility, setColumnVisibility] = React.useState(
    Object.assign({}, ...defaultHiddenColumns.map((c) => ({ [c]: false }))),
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      ...(pagination && { pagination }),
    },
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    ...(pagination !== false && { getPaginationRowModel: getPaginationRowModel() }),
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand: () => !!renderSubComponent,
    debugTable: false,
    ...rest,
  });

  const pageSizeOptions = [10, 20, 30, 40, 50].map((o) => ({ value: o, label: o.toString() }));

  return (
    <>
      <TableContainer>
        <Table id={prefixId && `${prefixId}__table`}>
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
                      {header.isPlaceholder ? null : (
                        <Box display="flex" justifyContent="center" alignItems="center">
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
                        </Box>
                      )}
                    </th>
                  );
                })}
                <FilterColumn>
                  {enableColumnVisibility && table.getHeaderGroups().length === groupIndex + 1 && (
                    <ZigDropdown
                      component={() => (
                        <HeaderIconButton id={prefixId && `${prefixId}-table__popover-filter`}>
                          <MoreVert sx={{ color: "neutral200" }} />
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
                              <CheckBox
                                value={column.getIsVisible()}
                                label={column.columnDef.header as string}
                                onChange={(v) => {
                                  if (v || table.getVisibleLeafColumns().length > 2) {
                                    column.toggleVisibility(v);
                                  }
                                }}
                              />
                            ),
                          };
                        })}
                    />
                  )}
                </FilterColumn>
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => {
              return (
                <React.Fragment key={row.id}>
                  <tr
                    {...(row.getCanExpand() && {
                      onClick: row.getToggleExpandedHandler(),
                      style: { cursor: "pointer" },
                    })}
                  >
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td key={cell.id}>
                          <ZigTypography fontWeight="medium" color="neutral200">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </ZigTypography>
                        </td>
                      );
                    })}
                    <td />
                  </tr>
                  {row.getIsExpanded() && (
                    <tr style={{ border: "none", padding: "0 14px" }}>
                      <td colSpan={row.getVisibleCells().length}>{renderSubComponent!({ row })}</td>
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
              <PageNumberContainer>
                <ZigTypography variant="h3" color="neutral100">
                  {table.getState().pagination.pageIndex + 1}
                </ZigTypography>
              </PageNumberContainer>
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
            mx={2}
            flexBasis={["100%", "auto"]}
            justifyContent={["center", "flex-end"]}
            marginTop={[1, 0]}
          >
            <ZigTypography color="neutral300">Displaying</ZigTypography>
            <SmallSelectWrapper>
              <ZigSelect
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
    </>
  );
}
