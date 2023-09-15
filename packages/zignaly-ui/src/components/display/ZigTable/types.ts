import React from "react";

import { Row, TableOptions, TableState } from "@tanstack/react-table";

interface ZigTablePropsBase<T extends object>
  extends Omit<TableOptions<T>, "getCoreRowModel" | "data"> {
  prefixId?: string;
  columnVisibility?: boolean;
  defaultHiddenColumns?: string[];
  renderSubComponent?: (props: { row: Row<T> }) => React.ReactElement;
  emptyMessage?: string;
}

export interface ZigTablePropsData<T extends object> extends ZigTablePropsBase<T> {
  pagination?: false | TableState["pagination"];
  loading?: boolean;
  data: TableOptions<T>["data"];
}

export interface ZigTablePropsPaginatedQuery<T extends object> extends ZigTablePropsBase<T> {
  query: {
    isFetching: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    error?: unknown;
    refetch: () => void;
    data?: T[];
  };
  queryExtraParams?: Record<string, string | number>;
}

export type ZigTableProps<T extends object> = ZigTablePropsData<T> | ZigTablePropsPaginatedQuery<T>;

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
