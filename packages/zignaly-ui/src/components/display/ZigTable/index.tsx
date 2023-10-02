import React, { ForwardedRef, forwardRef } from "react";
import { ZigTableProps, ZigTableQueryParams, ZigTableQueryRef } from "./types";
import ZigTableData from "./ZigTableData";
import ZigTableRtkInfiniteQuery from "./ZigTableRtkInfiniteQuery";
import ZigTableRtkFiniteQuery from "./ZigTableRtkFiniteQuery";

const ZigTable = <T extends object, V extends ZigTableQueryParams>(
  props: ZigTableProps<T, V>,
  ref: ForwardedRef<ZigTableQueryRef>,
) => {
  if ("data" in props) return <ZigTableData {...props} />;
  if ("useQuery" in props && props.infinite)
    return <ZigTableRtkInfiniteQuery {...props} ref={ref} />;
  if ("useQuery" in props && !props.infinite)
    return <ZigTableRtkFiniteQuery {...props} ref={ref} />;
  throw new Error("ZigTable should have either data or query prop");
};

export default forwardRef(ZigTable) as <T extends object, V extends ZigTableQueryParams>(
  props: ZigTableProps<T, V> & { ref?: ForwardedRef<ZigTableQueryRef> },
) => ReturnType<typeof ZigTable>;
