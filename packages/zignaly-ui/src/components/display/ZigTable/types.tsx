import { ColumnDef, TableState } from "@tanstack/react-table";
import { Column, Row, UseSortByColumnOptions } from "react-table";

type ExtendedColumn<T extends object> = Column<T> & UseSortByColumnOptions<T>;

export interface ZigTableProps0<T extends object> {
  columns: Array<ExtendedColumn<T>>;
  data: T[];
  defaultHiddenColumns?: string[];
  onColumnHidden?: (column: string, isHidden: boolean) => void;
  hideOptionsButton: boolean;
  maxWidth?: number;
  initialState?: object;
  emptyMessage?: string | JSX.Element;
  hasFooter?: boolean;
  pagination?: boolean;
  sort?: boolean;
  renderRowSubComponent?: (row: Row<T>) => JSX.Element;
}

export type ZigTableProps<T> = {
  data: T[];
  columns: ColumnDef<T>[];
  initialState?: Partial<TableState>;
};
