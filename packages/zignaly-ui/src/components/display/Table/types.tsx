import { ChartsProps } from "../Charts/types";
import { BalanceSummaryProps } from "./components/BalanceSummary/types";
import { PercentageIndicatorProps } from "./components/PercentageIndicator/types";
import { ServiceNameProps } from "./components/ServiceName/types";

export const tableTypes = {
  basic: "basic",
  pagedWithData: "pagedWithData",
  pagedWithOutData: "pagedWithOutData",
};
export interface TableBasicProps {
  columns: any[];
  data: Object[];
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

export interface TableProps extends TableBasicProps {
  type?: keyof typeof tableTypes;
}

export interface UserTableData {
  summary: BalanceSummaryProps;
  serviceName: ServiceNameProps;
  chart: ChartsProps;
  dailyAvg: PercentageIndicatorProps;
  oneMonth: PercentageIndicatorProps;
  threeMonths: PercentageIndicatorProps;
  all: PercentageIndicatorProps;
}
