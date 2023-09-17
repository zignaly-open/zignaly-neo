import React from "react";
import { ZigTableProps } from "./types";
import ZigTableData from "./ZigTableData";
import ZigTableRtkInfiniteQuery from "./ZigTableRtkInfiniteQuery";

export default function ZigTable<T extends object, V extends Record<any, any>>(
  props: ZigTableProps<T, V>,
) {
  if ("data" in props) return <ZigTableData {...props} />;
  if ("query" in props) return <ZigTableRtkInfiniteQuery {...props} />;
  throw new Error("ZigTable should have either data or query prop");
}
