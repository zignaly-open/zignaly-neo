import { Row, TableOptions, TableState, ColumnMeta as ColumnMetaOrig } from "@tanstack/react-table";

export interface ZigTableProps<T extends object> extends Omit<TableOptions<T>, "getCoreRowModel"> {
  pagination?: TableState["pagination"];
  enablePagination?: boolean;
  loading?: boolean;
  columnVisibility?: boolean;
  renderSubComponent?: (props: { row: Row<T> }) => React.ReactElement;
}

declare module "@tanstack/react-table" {
  export interface ColumnMeta extends ColumnMetaOrig {
    subtitle: string;
  }
}
