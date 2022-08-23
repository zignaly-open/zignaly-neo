import { ChartsProps } from "../Charts/types";
import { BalanceSummaryProps } from "./components/BalanceSummary/types";
import { PercentageIndicatorProps } from "./components/PercentageIndicator/types";
import { ServiceNameProps } from "./components/ServiceName/types";
import { BalanceSummary } from "./components/BalanceSummary";
import { ServiceName } from "./components/ServiceName";
import { AreaChart } from "../Charts";
import React from "react";
import PercentageIndicator from "./components/PercentageIndicator";
import AssetsInPool from "./components/AssetsInPool";
import InvestColumn from "./components/InvestColumn";
import { Column } from "utils/column";
import Typography from "../Typography";

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
