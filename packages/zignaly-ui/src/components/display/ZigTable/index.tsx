import React from "react";
import { ZigTableProps } from "./types";
import ZigTableData from "./ZigTableData";
import ZigTableRtkInfiniteQuery from "./ZigTableRtkInfiniteQuery";
import ZigTableRtkFiniteQuery from "./ZigTableRtkFiniteQuery";

export default function ZigTable<T extends object, V extends Record<any, any>>(
  props: ZigTableProps<T, V>,
) {
  if ("data" in props) return <ZigTableData {...props} />;
  if ("useQuery" in props && props.infinite) return <ZigTableRtkInfiniteQuery {...props} />;
  if ("useQuery" in props && !props.infinite) return <ZigTableRtkFiniteQuery {...props} />;
  throw new Error("ZigTable should have either data or query prop");
}
