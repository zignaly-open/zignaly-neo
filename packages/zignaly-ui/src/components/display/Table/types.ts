export interface TableProps {
  columns: any[];
  data: Object[];
  defaultHiddenColumns?: string[];
  onColumnHidden?: (column: string, isHidden: boolean) => void;
}
