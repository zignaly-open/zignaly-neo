import { ColumnDef, TableState, Row } from "@tanstack/react-table";

export type ZigTableProps<T extends object> = {
  data: T[];
  columns: ColumnDef<T>[];
  initialState?: Partial<TableState>;
  pagination?: boolean;
  columnVisibility?: boolean;
  renderSubComponent?: (props: { row: Row<T> }) => React.ReactElement;
};
