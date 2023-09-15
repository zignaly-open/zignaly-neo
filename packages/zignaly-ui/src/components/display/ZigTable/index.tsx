import React from "react";
import { ZigTableProps } from "./types";
import ZigTableData from "./ZigTableData";
import ZigTableRtkQuery from "./ZigTableRtkQuery";

export default function ZigTable<T extends object>(props: ZigTableProps<T>) {
  if ("data" in props) return <ZigTableData {...props} />;
  if ("query" in props) return <ZigTableRtkQuery {...props} />;
  throw new Error("ZigTable should have either data or query prop");
}
