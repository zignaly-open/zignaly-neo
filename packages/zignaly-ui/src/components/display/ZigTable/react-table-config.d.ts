import { ColumnMeta as ColumnMetaOrig } from "@tanstack/react-table";

declare module "@tanstack/react-table" {
  export interface ColumnMeta extends ColumnMetaOrig {
    subtitle: string;
  }
}
