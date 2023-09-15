import React from "react";
import { ZigTablePropsData } from "./types";
import ZigTableData from "./ZigTableData";

export default function ZigTableRtkQuery<T extends object>(props: ZigTablePropsData<T>) {
  return <ZigTableData {...props} />;
}
