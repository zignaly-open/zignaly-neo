import { ChartsProps } from "../Charts/types";
import { PercentageIndicatorProps } from "./components/PercentageIndicator/types";
import { Column, UseSortByColumnOptions } from "react-table";

type ExtendedColumn<T extends object> = Column<T> & UseSortByColumnOptions<T>;

export const tableTypes = {
  basic: "basic",
  pagedWithData: "pagedWithData",
  pagedWithOutData: "pagedWithOutData",
};

export interface TableBasicProps<T extends object> {
  columns: Array<ExtendedColumn<T>>;
  data: T[];
  defaultHiddenColumns?: string[];
  onColumnHidden?: (column: string, isHidden: boolean) => void;
  hideOptionsButton: boolean;
  isUserTable: boolean;
  maxWidth?: number;
  initialState?: object;
  emptyMessage?: string | JSX.Element;
  isPagingWithAllData?: boolean;
  hasFooter?: boolean;
}

export interface TableProps<T extends object> extends TableBasicProps<T> {
  type?: keyof typeof tableTypes;
}

export interface UserTableData {
  chart: ChartsProps;
  dailyAvg: PercentageIndicatorProps;
  oneMonth: PercentageIndicatorProps;
  threeMonths: PercentageIndicatorProps;
  all: PercentageIndicatorProps;
}
