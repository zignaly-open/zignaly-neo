import React from "react";

import { Row, TableOptions, TableState } from "@tanstack/react-table";

export interface ZigTableProps<T extends object> extends Omit<TableOptions<T>, "getCoreRowModel"> {
  pagination?: false | TableState["pagination"];
  loading?: boolean;
  columnVisibility?: boolean;
  defaultHiddenColumns?: string[];
  renderSubComponent?: (props: { row: Row<T> }) => React.ReactElement;
  emptyMessage?: string;
}

declare module "@tanstack/react-table" {
  // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/59304
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  interface ColumnDefBase {
    style?: React.CSSProperties;
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  interface ColumnMeta {
    subtitle: string | JSX.Element;
    style?: React.CSSProperties;
  }
}
