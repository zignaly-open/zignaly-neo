import { Column, Row, UseSortByColumnOptions } from "react-table";

type ExtendedColumn<T extends object> = Column<T> & UseSortByColumnOptions<T>;

export interface ZigTableProps<T extends object> {
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
  renderRowSubComponent?: (row: Row<T>) => JSX.Element;
}
