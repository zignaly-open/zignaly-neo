import React from "react";
import { ZigTablePropsPaginatedQuery } from "./types";
import ZigTableData from "./ZigTableData";

export default function ZigTableRtkQuery<T extends object>(props: ZigTablePropsPaginatedQuery<T>) {
  // @ts-ignore
  return <ZigTableData {...props} />;
}
