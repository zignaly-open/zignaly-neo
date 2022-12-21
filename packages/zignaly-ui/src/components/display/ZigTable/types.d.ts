import {
  Row,
  TableOptions,
  TableState,
  ColumnMeta as ColumnMetaOrig,
  ColumnDefBase as ColumnDefBaseOrig,
} from "@tanstack/react-table";

export interface ZigTableProps<T extends object> extends Omit<TableOptions<T>, "getCoreRowModel"> {
  pagination?: false | TableState["pagination"];
  loading?: boolean;
  columnVisibility?: boolean;
  renderSubComponent?: (props: { row: Row<T> }) => React.ReactElement;
  emptyMessage?: string;
}

declare module "@tanstack/react-table" {
  export interface ColumnDefBase extends ColumnDefBaseOrig {
    style?: React.CSSProperties;
  }

  export interface ColumnMeta extends ColumnMetaOrig {
    subtitle: string;
    style?: React.CSSProperties;
  }
}
