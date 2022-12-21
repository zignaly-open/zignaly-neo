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
import { HeaderIconButton, PageNumberContainer, SmallSelectWrapper, SortBox } from "./styles";
import DropDown from "../DropDown";
import ZigTypography from "../ZigTypography";
import IconButton from "../../inputs/IconButton";
import CheckBox from "../../inputs/CheckBox";
import { ZigTableProps } from "./types";
import { Box } from "@mui/material";
import { ChevronLeft, ChevronRight, FirstPage, LastPage, MoreVert } from "@mui/icons-material";
import ZigSelect from "components/inputs/ZigSelect";
import { Table, SortIcon } from "./styles";
import Loader from "../Loader";

export default function ZigTable<T extends object>({
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
      <Table>
        <thead>
          {table.getHeaderGroups().map((headerGroup, groupIndex) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header, index) => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
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
                              <ZigTypography color="neutral400" variant="h5">
                                {flexRender(
                                  header.column.columnDef.meta.subtitle,
                                  header.getContext(),
                                )}
                              </ZigTypography>
                            )}
                          </div>
                          {header.column.getCanSort() && (
                            <SortIcon isSorted={header.column.getIsSorted()} />
                          )}
                        </SortBox>
                        {enableColumnVisibility &&
                          table.getHeaderGroups().length === groupIndex + 1 &&
                          headerGroup.headers.length === index + 1 && (
                            <DropDown
                              component={({ open }) => (
                                <HeaderIconButton
                                  variant="flat"
                                  isFocused={open}
                                  icon={<MoreVert sx={{ color: "neutral200" }} />}
                                />
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
                                          if (v || table.getVisibleLeafColumns().length > 1) {
                                            column.toggleVisibility(v);
                                          }
                                        }}
                                      />
                                    ),
                                  };
                                })}
                            />
                          )}
                      </Box>
                    )}
                  </th>
                );
              })}
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
                        <ZigTypography variant="body2" fontWeight="medium" color="neutral200">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </ZigTypography>
                      </td>
                    );
                  })}
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
      {!data.length && (
        <ZigTypography
          variant="body2"
          color="neutral400"
          textAlign="center"
          padding="36px"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          {emptyMessage}
        </ZigTypography>
      )}
      {pagination !== false && (
        <Box p="22px" display="flex" alignItems="center" justifyContent="center">
          <Box display="flex" flex={3} justifyContent="flex-start" />
          <Box justifyContent="center" display="flex" gap={1} alignItems="center" flex={3}>
            <IconButton
              variant="flat"
              size="xlarge"
              shrinkWrap={true}
              icon={<FirstPage width={24} height={24} sx={{ color: "neutral300" }} />}
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            />
            <IconButton
              variant="flat"
              size="xlarge"
              shrinkWrap={true}
              icon={<ChevronLeft width={24} height={24} sx={{ color: "neutral300" }} />}
              onClick={table.previousPage}
              disabled={!table.getCanPreviousPage()}
            />
            <Box display="flex" gap={1} alignItems="center" px={2}>
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
                  <ZigTypography color="neutral100" fontWeight={600}>
                    {table.getPageCount()}
                  </ZigTypography>
                </>
              )}
            </Box>
            {loading && <Loader color="#fff" width="24px" height="24px" ariaLabel="loading" />}
            <IconButton
              variant="flat"
              size="xlarge"
              shrinkWrap={true}
              icon={<ChevronRight width={24} height={24} sx={{ color: "neutral300" }} />}
              onClick={table.nextPage}
              disabled={!table.getCanNextPage()}
            />
            {table.getPageCount() !== -1 && (
              <IconButton
                variant="flat"
                size="xlarge"
                shrinkWrap={true}
                icon={<LastPage width={24} height={24} sx={{ color: "neutral300" }} />}
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              />
            )}
          </Box>
          <Box flex={3} display="flex" gap={2} alignItems="center" justifyContent="flex-end" ml={2}>
            <ZigTypography color="neutral300">Displaying</ZigTypography>
            <SmallSelectWrapper>
              <ZigSelect
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
