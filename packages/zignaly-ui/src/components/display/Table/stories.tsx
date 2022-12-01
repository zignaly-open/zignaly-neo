import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import NumberFormat from "react-number-format";
import Table from "./";
import PriceLabel from "./components/PriceLabel";
import PercentageIndicator from "./components/PercentageIndicator";
import ConnectionStateLabel, { ConnectionStateLabelId } from "./components/ConnectionStateLabel";
import DateLabel from "./components/DateLabel";
import { CheckIconStyled, CloseIconStyled } from "./styles";
import { dark } from "../../../theme";
import Typography from "../Typography";
import { MockMyCoinsData } from "./mockData";
import { AreaChart } from "../Charts";
import { UserTableData } from "./types";
import { ChartsProps } from "../Charts/types";

const createMarketPlaceTableHeader = () => {
  return [
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

interface MarketPlaceTableProps {
  chart: ChartsProps;
  oneYear: {
    value: number;
    subtitle: string;
    showTrophy: boolean;
  };
}

const createMarketPlaceTableBodyObject = ({ chart, oneYear }: MarketPlaceTableProps) => {
  return {
    chart: <AreaChart variant={chart.variant} data={chart.data} />,
    oneYear: <PercentageIndicator value={oneYear.value} />,
  };
};

const createUserTableHeader = () => {
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

const createUserTableDataObject = ({
  chart,
  dailyAvg,
  oneMonth,
  threeMonths,
  all,
}: UserTableData) => {
  return {
    chart: <AreaChart variant={chart.variant} data={chart.data} />,
    dailyAvg: <PercentageIndicator value={dailyAvg.value} />,
    oneMonth: <PercentageIndicator value={oneMonth.value} />,
    threeMonths: <PercentageIndicator value={threeMonths.value} />,
    all: <PercentageIndicator value={all.value} />,
  };
};

export default {
  title: "Display/Table",
  component: Table,
  decorators: [(story) => <div style={{ paddingBottom: "2rem" }}>{story()}</div>],
} as ComponentMeta<typeof Table>;

const Template: ComponentStory<typeof Table> = (args) => <Table {...args} />;
/**
 * IMPORTANT if there are amounts of money use the sortByPointDecimal function to sort.
 * IMPORTANT useMemo must be used and in the following way wrap the result of the sort function executed in a variable because if not it will not be memorized,
 * it will create a new function whenever it is always executed
 */
export const MyCoins = Template.bind({});
MyCoins.args = {
  type: "pagedWithData",
  hideOptionsButton: false,
  hasFooter: true,
  initialState: {
    sortBy: [
      {
        id: "totalBalance",
        desc: false,
      },
    ],
  },
  columns: [
    {
      Header: "Coin",
      accessor: "coin",
    },
    {
      Header: "Total Balance",
      accessor: "totalBalance",
    },
    {
      Header: "Available Balance",
      accessor: "availableBalance",
    },
    {
      Header: "Locked Balance",
      accessor: "lockedBalance",
    },
    {
      Header: "Value in BTC",
      accessor: "valueInBtc",
    },
    {
      Header: "Value in USD",
      accessor: "valueInUsd",
    },
  ],
  data: MockMyCoinsData,
};

export const Investors = Template.bind({});
Investors.args = {
  hideOptionsButton: false,
  columns: [
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "User ID",
      accessor: "userId",
    },
    {
      Header: "Investment",
      accessor: "investment",
    },
    {
      Header: "P & L",
      accessor: "pyd",
    },
    {
      Header: "P & L Total",
      accessor: "pydTotal",
    },
    {
      Header: "Total Fees Paid",
      accessor: "totalFeesPaid",
    },
    {
      Header: "Success Fee",
      accessor: "successFee",
    },
    {
      Header: "Fees in ZIG",
      accessor: "feesInZig",
    },
    {
      Header: "Status",
      accessor: "status",
    },
  ],
  data: [
    {
      email: (
        <Typography color="neutral100" variant="body2">
          tec**@zig**.com
        </Typography>
      ),
      userId: (
        <Typography color="neutral200" variant="h5">
          5f886d29da8e9666b1684c9a
        </Typography>
      ),
      investment: <PriceLabel coin={"USDT"} value={"1250"} />,
      pyd: (
        <PriceLabel
          coin={"USDT"}
          value={"37.5"}
          bottomElement={<PercentageIndicator value={3} />}
        />
      ),
      pydTotal: <PriceLabel coin={"USDT"} value={"145"} />,
      totalFeesPaid: <PriceLabel coin={"USDT"} value={"218"} />,
      successFee: (
        <Typography color="neutral100" variant="body1">
          10%
        </Typography>
      ),
      feesInZig: <CheckIconStyled width="24" height="24" color={dark.neutral300} />,
      status: <ConnectionStateLabel stateId={ConnectionStateLabelId.CONNECTED} />,
    },
    {
      email: (
        <Typography color="neutral100" variant="body2">
          tec**@zig**.com
        </Typography>
      ),
      userId: (
        <Typography color="neutral200" variant="h5">
          5f886d29da8e9666b1684c9a
        </Typography>
      ),
      investment: <PriceLabel coin={"USDT"} value={"1250"} />,
      pyd: (
        <PriceLabel
          coin={"USDT"}
          value={"0.85"}
          bottomElement={<PercentageIndicator value={-1} />}
        />
      ),
      pydTotal: <PriceLabel coin={"USDT"} value={"23.68586856858"} />,
      totalFeesPaid: <PriceLabel coin={"USDT"} value={"71813"} />,
      successFee: (
        <Typography color="neutral100" variant="body1">
          10%
        </Typography>
      ),
      feesInZig: <CloseIconStyled width="24" height="24" color={dark.neutral300} />,
      status: <ConnectionStateLabel stateId={ConnectionStateLabelId.DISCONNECTED} />,
    },

    {
      email: (
        <Typography color="neutral100" variant="body2">
          tec**@zig**.com
        </Typography>
      ),
      userId: (
        <Typography color="neutral200" variant="h5">
          5f886d29da8e9666b1684c9a
        </Typography>
      ),
      investment: <PriceLabel coin={"USDT"} value={"3468"} />,
      pyd: (
        <PriceLabel
          coin={"USDT"}
          value={"637956.523"}
          bottomElement={<PercentageIndicator value={-3} />}
        />
      ),
      pydTotal: <PriceLabel coin={"USDT"} value={"0.347347"} />,
      totalFeesPaid: <PriceLabel coin={"USDT"} value={"09864"} />,
      successFee: (
        <Typography color="neutral100" variant="body1">
          10%
        </Typography>
      ),
      feesInZig: <CloseIconStyled width="24" height="24" color={dark.neutral300} />,
      status: <ConnectionStateLabel stateId={ConnectionStateLabelId.HARD_DISCONNECT} />,
    },
    {
      email: (
        <Typography color="neutral100" variant="body2">
          tec**@zig**.com
        </Typography>
      ),
      userId: (
        <Typography color="neutral200" variant="h5">
          5f886d29da8e9666b1684c9a
        </Typography>
      ),
      investment: <PriceLabel coin={"USDT"} value={"1250"} />,
      pyd: (
        <PriceLabel
          coin={"USDT"}
          value={"1929292"}
          bottomElement={<PercentageIndicator value={-87} />}
        />
      ),
      pydTotal: <PriceLabel coin={"USDT"} value={"134581"} />,
      totalFeesPaid: <PriceLabel coin={"USDT"} value={"218"} />,
      successFee: (
        <Typography color="neutral100" variant="body1">
          10%
        </Typography>
      ),
      feesInZig: <CloseIconStyled width="24" height="24" color={dark.neutral300} />,
      status: <ConnectionStateLabel stateId={ConnectionStateLabelId.SOFT_DISCONNECT} />,
    },
    {
      email: (
        <Typography color="neutral100" variant="body2">
          tec**@zig**.com
        </Typography>
      ),
      userId: (
        <Typography color="neutral200" variant="h5">
          5f886d29da8e9666b1684c9a
        </Typography>
      ),
      investment: <PriceLabel coin={"USDT"} value={"1250"} />,
      pyd: (
        <PriceLabel
          coin={"USDT"}
          value={"30.5"}
          bottomElement={<PercentageIndicator value={-1} />}
        />
      ),
      pydTotal: <PriceLabel coin={"USDT"} value={"145"} />,
      totalFeesPaid: <PriceLabel coin={"USDT"} value={"218"} />,
      successFee: (
        <Typography color="neutral100" variant="body1">
          10%
        </Typography>
      ),
      feesInZig: <CloseIconStyled width="24" height="24" color={dark.neutral300} />,
      status: <ConnectionStateLabel stateId={ConnectionStateLabelId.SUSPENDED} />,
    },
  ],
};

export const UserDashBoard = Template.bind({});
UserDashBoard.args = {
  hideOptionsButton: true,
  isUserTable: true,
  columns: createUserTableHeader(),
  data: [
    createUserTableDataObject({
      chart: {
        data: [
          { x: "Jul 1", y: 10 },
          { x: "Jul 2", y: 15 },
          { x: "Jul 3", y: 23 },
          { x: "Jul 4", y: 15 },
          { x: "Jul 5", y: 17 },
          { x: "Jul 6", y: 20 },
          { x: "Jul 7", y: 25 },
        ],
        variant: "small",
      },
      dailyAvg: { value: -10 },
      oneMonth: { value: 10 },
      threeMonths: { value: 10 },
      all: { value: 10 },
    }),
    createUserTableDataObject({
      chart: {
        data: [
          { x: "Jul 1", y: 10 },
          { x: "Jul 2", y: 15 },
          { x: "Jul 3", y: 23 },
          { x: "Jul 4", y: 15 },
          { x: "Jul 5", y: 17 },
          { x: "Jul 6", y: 20 },
          { x: "Jul 7", y: 25 },
        ],
        variant: "small",
      },
      dailyAvg: { value: -10 },
      oneMonth: { value: 10 },
      threeMonths: { value: 10 },
      all: { value: 10 },
    }),
  ],
};

export const MarketPlaceTabel = Template.bind({});
MarketPlaceTabel.args = {
  hideOptionsButton: true,
  columns: createMarketPlaceTableHeader(),
  data: [
    createMarketPlaceTableBodyObject({
      chart: {
        data: [
          { x: "Jul 1", y: 10 },
          { x: "Jul 2", y: 15 },
          { x: "Jul 3", y: 23 },
          { x: "Jul 4", y: 15 },
          { x: "Jul 5", y: 17 },
          { x: "Jul 6", y: 15 },
          { x: "Jul 7", y: 5 },
        ],
        variant: "small",
        midLine: true,
      },
      oneYear: { value: 100, subtitle: "Subtitle", showTrophy: true },
    }),
    createMarketPlaceTableBodyObject({
      chart: {
        data: [
          { x: "Jul 1", y: 10 },
          { x: "Jul 2", y: 15 },
          { x: "Jul 3", y: 23 },
          { x: "Jul 4", y: 15 },
          { x: "Jul 5", y: 17 },
          { x: "Jul 6", y: 15 },
          { x: "Jul 7", y: 5 },
        ],
        variant: "small",
        midLine: true,
      },
      oneYear: { value: 50, subtitle: "Subtitle", showTrophy: false },
    }),
  ],
};

export const ExchangeOrders = Template.bind({});
ExchangeOrders.args = {
  hideOptionsButton: false,
  columns: [
    {
      Header: "Date",
      accessor: "date",
    },
    {
      Header: "Order ID",
      accessor: "orderId",
    },
    {
      Header: "Pair",
      accessor: "pair",
    },
    {
      Header: "Amount",
      accessor: "amount",
    },
    {
      Header: "Status",
      accessor: "status",
    },
    {
      Header: "Entry Price",
      accessor: "entryPrice",
    },
    {
      Header: "Side",
      accessor: "side",
    },
    {
      Header: "Type",
      accessor: "type",
    },
  ],
  data: [
    {
      date: <DateLabel date={new Date("December 2, 1997 20:10:00")} />,
      orderId: "138495028471",
      pair: "XML/USDT",
      amount: <NumberFormat value={35.978087076} displayType={"text"} thousandSeparator={true} />,
      status: "Open",
      entryPrice: <NumberFormat value={"110.20"} displayType={"text"} thousandSeparator={true} />,
      side: "Buy",
      type: "Limit",
    },
    {
      date: <DateLabel date={new Date("December 15, 1997 20:10:00")} />,
      orderId: "248495028471",
      pair: "XML/USDT",
      amount: <NumberFormat value={2352} displayType={"text"} thousandSeparator={true} />,
      status: "Open",
      entryPrice: <NumberFormat value={"21077.20"} displayType={"text"} thousandSeparator={true} />,
      side: "Buy",
      type: "Limit",
    },
    {
      date: <DateLabel date={new Date("December 7, 1997 20:10:00")} />,
      orderId: "358495028471",
      pair: "XML/USDT",
      amount: <NumberFormat value={643745} displayType={"text"} thousandSeparator={true} />,
      status: "Open",
      entryPrice: <NumberFormat value={"3109.60"} displayType={"text"} thousandSeparator={true} />,
      side: "Buy",
      type: "Limit",
    },
  ],
};
