import React from "react";

import { Row, SortingState, TableOptions, TableState } from "@tanstack/react-table";
import { RtkQueryLike } from "../../../utils/rtk";

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
  fetching?: boolean;
  data: TableOptions<T>["data"];
}

export type ZigTableQueryParams = Record<string, string | number>;

export type RtkQueryLikeInfinitePagination<
  TData extends object,
  TParams extends object,
> = RtkQueryLike<
  { metadata: { from: string }; items: TData[] },
  TParams & { limit: number; from: string }
>;

export type RtkQueryLikeFinitePagination<
  TData extends object,
  TParams extends object,
> = RtkQueryLike<
  { metadata: { totalPages: number; currentPage: number; totalLength: number }; data: TData[] },
  TParams & { limit: number; offset: number; sort?: string; direction?: string }
>;

export type ZigTableQueryRef = {
  refetch: () => void;
};

export interface ZigTablePropsInfiniteQuery<T extends object, V extends ZigTableQueryParams>
  extends ZigTablePropsBase<T> {
  useQuery: RtkQueryLikeInfinitePagination<T, V>;
  // actually it'd be a different type but whatever
  queryDataMapper?: (data: T) => T;
  queryExtraParams?: V;
  infinite: true;
}
export interface ZigTablePropsFiniteQuery<T extends object, V extends ZigTableQueryParams>
  extends ZigTablePropsBase<T> {
  useQuery: RtkQueryLikeFinitePagination<T, V>;
  // actually it'd be a different type but whatever
  queryDataMapper?: (data: T) => T;
  queryExtraParams?: V;
  infinite: false | undefined;
}

export type ZigTableProps<T extends object, V extends ZigTableQueryParams> =
  | ZigTablePropsData<T>
  | ZigTablePropsInfiniteQuery<T, V>
  | ZigTablePropsFiniteQuery<T, V>;

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
