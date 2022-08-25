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
  data: {
    action?: React.ReactNode;
  }[];
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
interface MarketPlaceTableProps {
  serviceName: {
    heading: string;
    subtitle: string;
    cryptoName: string;
    cryptoAlt: string;
  };
  assetsInPool: {
    assetsValue: number;
    numberOfInvestors: number;
  };
  chart: ChartsProps;
  oneYear: {
    value: number;
    subtitle: string;
    showTrophy: boolean;
  };
}

export const createMarketPlaceTableHeader = () => {
  return [
    {
      Header: (
        <Column style={{ position: "absolute", bottom: -15, left: 0, marginLeft: 104 }}>
          <div>{"ServiceName"}</div>
          <Typography variant="h5" weight="medium" color="neutral400">
            {"Manager/Base Currency"}
          </Typography>
        </Column>
      ),
      accessor: "serviceName",
    },
    {
      Header: "Assets In Pool",
      Footer: (
        <div>
          <div>{"# Of Investors"}</div>
        </div>
      ),
      accessor: "assetsInPool",
    },
    {
      Header: "1 year",
      accessor: "oneYear",
    },
    {
      Header: "1 month",
      accessor: "chart",
    },
    {
      Header: "",
      accessor: "invest",
    },
  ];
};

export const createMarketPlaceTableBodyObject = ({
  serviceName,
  assetsInPool,
  chart,
  oneYear,
}: MarketPlaceTableProps) => {
  return {
    serviceName: (
      <ServiceName
        heading={serviceName.heading}
        subtitle={serviceName.subtitle}
        cryptoName={serviceName.cryptoName}
        cryptoAlt={serviceName.cryptoAlt}
      />
    ),
    assetsInPool: (
      <AssetsInPool
        assetsValue={assetsInPool.assetsValue}
        numberOfInvestors={assetsInPool.numberOfInvestors}
      />
    ),
    chart: <AreaChart variant={chart.variant} data={chart.data} />,
    oneYear: (
      <PercentageIndicator
        dashboardType="marketplace"
        value={oneYear.value}
        subtitle="2.2 years"
        showTrophy={oneYear.showTrophy}
      />
    ),
    invest: <InvestColumn type="invested" />,
  };
};

export const createUserTableHeader = () => {
  return [
    {
      Header: "My Current Value",
      accessor: "summary",
      headerWithFooter: (
        <div>
          <div>{"Returns"}</div>
        </div>
      ),
    },
    {
      Header: (
        <Column style={{ position: "absolute", bottom: -15, left: 0, marginLeft: 108 }}>
          <div>{"ServiceName"}</div>
          <Typography variant="h5" weight="medium" color="neutral400">
            {"Manager/Base Currency"}
          </Typography>
        </Column>
      ),
      accessor: "serviceName",
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
      headerWithFooter: (
        <div>
          <div>{"Age"}</div>
        </div>
      ),
    },
  ];
};

export const createUserTableDataObject = ({
  summary,
  serviceName,
  chart,
  dailyAvg,
  oneMonth,
  threeMonths,
  all,
}: UserTableData) => {
  return {
    summary: <BalanceSummary totalValue={summary.totalValue} profit={summary.profit} />,
    serviceName: (
      <ServiceName
        heading={serviceName.heading}
        subtitle={serviceName.subtitle}
        cryptoName={serviceName.cryptoName}
        cryptoAlt={serviceName.cryptoAlt}
      />
    ),
    chart: <AreaChart variant={chart.variant} data={chart.data} />,
    dailyAvg: <PercentageIndicator dashboardType="user" value={dailyAvg.value} />,

    oneMonth: <PercentageIndicator dashboardType="user" value={oneMonth.value} />,
    threeMonths: <PercentageIndicator dashboardType="user" value={threeMonths.value} />,
    all: <PercentageIndicator dashboardType="user" value={all.value} subtitle="2.2 years" />,
  };
};
