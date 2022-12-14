import React, { useCallback, useEffect, useState } from "react";
import {
  Column,
  Table as ReactTable,
  PaginationState,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnDef,
  OnChangeFn,
  flexRender,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";
import { ReactComponent as OptionsDotsIcon } from "assets/icons/option-dots-icon.svg";
import { ReactComponent as SingleChevron } from "assets/icons/chevron-small-icon.svg";
import { ReactComponent as DoubleChevron } from "assets/icons/double-chevron-small-icon.svg";
import {
  FooterContainer,
  PageNumberContainer,
  SelectorContainer,
  SelectorSizing,
  SmallSelectWrapper,
} from "./styles";
import DropDown from "../DropDown";
import ZigTypography from "../ZigTypography";
import IconButton from "../../inputs/IconButton";
import CheckBox from "../../inputs/CheckBox";
import { ZigTableProps } from "./types";
import { Box, useTheme } from "@mui/material";
import {
  ChevronLeft,
  ChevronRight,
  ExpandLess,
  ExpandMore,
  FirstPage,
  LastPage,
} from "@mui/icons-material";
import ZigSelect from "components/inputs/ZigSelect";
import { Table, SortIcon } from "./styles";

export default function ZigTable<T>({ data, columns, initialState = {} }: ZigTableProps<T>) {
  const [sorting, setSorting] = React.useState<SortingState>(initialState.sorting ?? []);
  const theme = useTheme();

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: false,
  });

  const pageSizeOptions = [10, 20, 30, 40, 50].map((o) => ({ value: o, label: o.toString() }));

  return (
    <>
      <Table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <Box
                        display="flex"
                        justifyContent="center"
                        onClick={header.column.getToggleSortingHandler()}
                        sx={{ cursor: header.column.getCanSort() ? "pointer" : "auto" }}
                      >
                        <div>
                          <ZigTypography color="neutral200" variant="body2">
                            {flexRender(header.column.columnDef.header, header.getContext())}
                          </ZigTypography>
                          <ZigTypography color="neutral400" variant="h5">
                            {flexRender(
                              header.column.columnDef.headerSubtitle,
                              header.getContext(),
                            )}
                          </ZigTypography>
                        </div>
                        <SortIcon isSorted={header.column.getIsSorted()} />
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
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
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
            <ZigTypography color="neutral300">out of</ZigTypography>
            <ZigTypography color="neutral100" fontWeight={600}>
              {table.getPageCount()}
            </ZigTypography>
          </Box>
          <IconButton
            variant="flat"
            size="xlarge"
            shrinkWrap={true}
            icon={<ChevronRight width={24} height={24} sx={{ color: "neutral300" }} />}
            onClick={table.nextPage}
            disabled={!table.getCanNextPage()}
          />
          <IconButton
            variant="flat"
            size="xlarge"
            shrinkWrap={true}
            icon={<LastPage width={24} height={24} sx={{ color: "neutral300" }} />}
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          />
        </Box>
        <Box flex={3} display="flex" gap={2} alignItems="center" justifyContent="flex-end">
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
    </>
  );
}
