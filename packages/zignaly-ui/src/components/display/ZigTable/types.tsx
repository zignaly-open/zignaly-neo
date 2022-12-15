import { Row, TableOptions } from "@tanstack/react-table";

export interface ZigTableProps<T extends object> extends Omit<TableOptions<T>, "getCoreRowModel"> {
  pagination?: boolean;
  columnVisibility?: boolean;
  renderSubComponent?: (props: { row: Row<T> }) => React.ReactElement;
}
