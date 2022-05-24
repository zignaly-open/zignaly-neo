import { ChartsProps } from "../Charts/types";
import { BalanceSummaryProps } from "./components/BalanceSummary/types";
import { PercentageIndicatorProps } from "./components/PercentageIndicator/types";
import { ServiceNameProps } from "./components/ServiceName/types";
import { BalanceSummary } from "./components/BalanceSummary";
import { ServiceName } from "./components/ServiceName";
import { AreaChart } from "../Charts";
import React from "react";
import PercentageIndicator from "./components/PercentageIndicator";

export interface TableProps {
  columns: any[];
  data: Object[];
  defaultHiddenColumns?: string[];
  onColumnHidden?: (column: string, isHidden: boolean) => void;
  hideOptionsButton: boolean;
  isUserTable: boolean;
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

export const createUserTable = ({
  summary,
  serviceName,
  chart,
  dailyAvg,
  oneMonth,
  threeMonths,
  all,
}: UserTableData) => {
  return {
    hideOptionsButton: true,
    isUserTable: true,
    columns: [
      {
        Header: "My Current Value",
        accessor: "summary",
        Footer: (
          <div>
            <div>{"Returns"}</div>
          </div>
        ),
      },
      {
        Header: "Service Name",
        accessor: "serviceName",
        Footer: (
          <div>
            <div>{"Manager"}</div> <div>{"Base currency"}</div>
          </div>
        ),
      },
      {
        Header: "Since Invested",
        accessor: "chart",
      },
      {
        Header: "Daily avg",
        accessor: "dailyAvg",
      },
      {
        Header: "1 mo.",
        accessor: "oneMonth",
      },
      {
        Header: "3 mo.",
        accessor: "threeMonths",
      },
      {
        Header: "All",
        accessor: "all",
        Footer: (
          <div>
            <div>{"Age"}</div>
          </div>
        ),
      },
    ],
    data: [
      {
        summary: (
          <BalanceSummary
            totalValue={summary.totalValue}
            profit={summary.profit}
            theme={summary.theme}
          ></BalanceSummary>
        ),

        serviceName: (
          <ServiceName
            heading={serviceName.heading}
            subtitle={serviceName.subtitle}
            cryptoName={serviceName.cryptoName}
            cryptoAlt={serviceName.cryptoAlt}
          ></ServiceName>
        ),
        chart: <AreaChart variant={chart.variant} data={chart.data}></AreaChart>,
        dailyAvg: (
          <PercentageIndicator
            dashboardType="user"
            value={dailyAvg.value}
            theme={dailyAvg.theme}
          ></PercentageIndicator>
        ),

        oneMonth: (
          <PercentageIndicator
            dashboardType="user"
            value={oneMonth.value}
            theme={oneMonth.theme}
          ></PercentageIndicator>
        ),
        threeMonths: (
          <PercentageIndicator
            dashboardType="user"
            value={threeMonths.value}
            theme={threeMonths.theme}
          ></PercentageIndicator>
        ),
        all: (
          <PercentageIndicator
            dashboardType="user"
            value={all.value}
            theme={all.theme}
            subtitle="2.2 years"
          ></PercentageIndicator>
        ),
      },
      {
        summary: (
          <BalanceSummary
            totalValue={summary.totalValue}
            profit={summary.profit}
            theme={summary.theme}
          ></BalanceSummary>
        ),

        serviceName: (
          <ServiceName
            heading={serviceName.heading}
            subtitle={serviceName.subtitle}
            cryptoName={serviceName.cryptoName}
            cryptoAlt={serviceName.cryptoAlt}
          ></ServiceName>
        ),
        chart: <AreaChart variant={chart.variant} data={chart.data}></AreaChart>,
        dailyAvg: (
          <PercentageIndicator
            dashboardType="user"
            value={dailyAvg.value}
            theme={dailyAvg.theme}
          ></PercentageIndicator>
        ),

        oneMonth: (
          <PercentageIndicator
            dashboardType="user"
            value={oneMonth.value}
            theme={oneMonth.theme}
          ></PercentageIndicator>
        ),
        threeMonths: (
          <PercentageIndicator
            dashboardType="user"
            value={threeMonths.value}
            theme={threeMonths.theme}
          ></PercentageIndicator>
        ),
        all: (
          <PercentageIndicator
            dashboardType="user"
            value={all.value}
            theme={all.theme}
            subtitle="2.2 years"
          ></PercentageIndicator>
        ),
      },
    ],
  };
};
