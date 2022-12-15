import React, { useMemo } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import NumberFormat from "react-number-format";
import { CheckIconStyled, CloseIconStyled } from "./styles";
import { dark } from "../../../theme";
import Typography from "../Typography";
import { MockMyCoinsData } from "./mockData";
import { AreaChart } from "../Charts";
import { ChartsProps } from "../Charts/types";
import ZigTable from ".";
import PercentageIndicator from "../Table/components/PercentageIndicator";
import ConnectionStateLabel, {
  ConnectionStateLabelId,
} from "../Table/components/ConnectionStateLabel";
import DateLabel from "../Table/components/DateLabel";
import CoinLabel from "../Table/components/CoinLabel";
import { ColumnDef } from "@tanstack/react-table";
import { makeCoinsData } from "./makeData";
import { ZigTablePriceLabel } from "../ZigPriceLabel";

const createMarketPlaceTableheader = () => {
  return [
    {
      header: "1 year",
      accessorKey: "oneYear",
    },
    {
      header: "1 month",
      accessorKey: "chart",
    },
    {
      header: "",
      accessorKey: "invest",
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

const userTableColumns: ColumnDef<{}>[] = [
  {
    header: "My Current Value",
    headerSubtitle: "Returns",
    accessorKey: "summary",
  },
  {
    header: "Since Invested",
    accessorKey: "chart",
    cell: ({ getValue }) => {
      const chart = getValue();
      return <AreaChart variant={chart.variant} data={chart.data} />;
    },
    enableSorting: false,
  },
  {
    header: "Daily avg",
    accessorKey: "dailyAvg",
    cell: ({ getValue }) => <PercentageIndicator value={getValue().value} />,
  },
  {
    header: "1 mo.",
    accessorKey: "oneMonth",
    cell: ({ getValue }) => <PercentageIndicator value={getValue().value} />,
  },
  {
    header: "3 mo.",
    accessorKey: "threeMonths",
    cell: ({ getValue }) => <PercentageIndicator value={getValue()} />,
  },
  {
    header: "All",
    accessorFn: (row) => {
      return row.all.value;
    },
    cell: ({ getValue }) => <PercentageIndicator value={getValue()} />,
  },
];

export default {
  title: "Display/ZigTable",
  component: ZigTable,
  decorators: [(story) => <div style={{ paddingBottom: "2rem" }}>{story()}</div>],
} as ComponentMeta<typeof ZigTable>;

const Template: ComponentStory<typeof ZigTable> = (args) => <ZigTable {...args} />;

export const MyCoins = Template.bind({});
MyCoins.args = {
  initialState: {
    sorting: [
      {
        id: "totalBalance",
        desc: false,
      },
    ],
  },
  columns: [
    {
      header: "Coin",
      accessorKey: "coin",
      cell: ({ getValue }) => <CoinLabel coin={getValue().coin} name={getValue().name} />,
    },
    {
      header: "Total Balance",
      accessorKey: "totalBalance",
      accessorFn: (row) => row.totalBalance.value,
      cell: ({ getValue, row }) => (
        <ZigTablePriceLabel
          color="neutral100"
          coinProps={{ color: "neutral400" }}
          coin={row.original.totalBalance.coin}
          value={getValue()}
        />
      ),
    },
    {
      header: "Available Balance",
      accessorKey: "availableBalance",
      cell: ({ getValue }) => (
        <ZigTablePriceLabel coin={getValue().coin} value={getValue().value} />
      ),
    },
    {
      header: "Locked Balance",
      accessorKey: "lockedBalance",
      cell: ({ getValue }) => (
        <ZigTablePriceLabel coin={getValue().coin} value={getValue().value} />
      ),
    },
    {
      header: "Value in BTC",
      accessorKey: "valueInBtc",
      cell: ({ getValue }) => (
        <ZigTablePriceLabel coin={getValue().coin} value={getValue().value} />
      ),
    },
    {
      header: "Value in USD",
      accessorKey: "valueInUsd",
      cell: ({ getValue }) => (
        <ZigTablePriceLabel coin={getValue().coin} value={getValue().value} />
      ),
    },
  ],
  data: makeCoinsData(50),
};

export const Investors = Template.bind({});
Investors.args = {
  hideOptionsButton: false,
  columns: [
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "User ID",
      accessorKey: "userId",
    },
    {
      header: "Investment",
      accessorKey: "investment",
    },
    {
      header: "P & L",
      accessorKey: "pyd",
    },
    {
      header: "P & L Total",
      accessorKey: "pydTotal",
    },
    {
      header: "Total Fees Paid",
      accessorKey: "totalFeesPaid",
    },
    {
      header: "Success Fee",
      accessorKey: "successFee",
    },
    {
      header: "Fees in ZIG",
      accessorKey: "feesInZig",
    },
    {
      header: "Status",
      accessorKey: "status",
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
      investment: <ZigTablePriceLabel coin={"USDT"} value={"1250"} />,
      pyd: (
        <ZigTablePriceLabel
          coin={"USDT"}
          value={"37.5"}
          bottomElement={<PercentageIndicator value={3} />}
        />
      ),
      pydTotal: <ZigTablePriceLabel coin={"USDT"} value={"145"} />,
      totalFeesPaid: <ZigTablePriceLabel coin={"USDT"} value={"218"} />,
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
      investment: <ZigTablePriceLabel coin={"USDT"} value={"1250"} />,
      pyd: (
        <ZigTablePriceLabel
          coin={"USDT"}
          value={"0.85"}
          bottomElement={<PercentageIndicator value={-1} />}
        />
      ),
      pydTotal: <ZigTablePriceLabel coin={"USDT"} value={"23.68586856858"} />,
      totalFeesPaid: <ZigTablePriceLabel coin={"USDT"} value={"71813"} />,
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
      investment: <ZigTablePriceLabel coin={"USDT"} value={"3468"} />,
      pyd: (
        <ZigTablePriceLabel
          coin={"USDT"}
          value={"637956.523"}
          bottomElement={<PercentageIndicator value={-3} />}
        />
      ),
      pydTotal: <ZigTablePriceLabel coin={"USDT"} value={"0.347347"} />,
      totalFeesPaid: <ZigTablePriceLabel coin={"USDT"} value={"09864"} />,
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
      investment: <ZigTablePriceLabel coin={"USDT"} value={"1250"} />,
      pyd: (
        <ZigTablePriceLabel
          coin={"USDT"}
          value={"1929292"}
          bottomElement={<PercentageIndicator value={-87} />}
        />
      ),
      pydTotal: <ZigTablePriceLabel coin={"USDT"} value={"134581"} />,
      totalFeesPaid: <ZigTablePriceLabel coin={"USDT"} value={"218"} />,
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
      investment: <ZigTablePriceLabel coin={"USDT"} value={"1250"} />,
      pyd: (
        <ZigTablePriceLabel
          coin={"USDT"}
          value={"30.5"}
          bottomElement={<PercentageIndicator value={-1} />}
        />
      ),
      pydTotal: <ZigTablePriceLabel coin={"USDT"} value={"145"} />,
      totalFeesPaid: <ZigTablePriceLabel coin={"USDT"} value={"218"} />,
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
  columns: userTableColumns,
  data: [
    {
      summary: "",
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
      threeMonths: 10,
      all: { value: 10 },
    },
    {
      summary: "",
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
      threeMonths: 20,
      all: { value: 20 },
    },
  ],
};

export const MarketPlaceTabel = Template.bind({});
MarketPlaceTabel.args = {
  hideOptionsButton: true,
  columns: createMarketPlaceTableheader(),
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
      header: "Date",
      accessorKey: "date",
    },
    {
      header: "Order ID",
      accessorKey: "orderId",
    },
    {
      header: "Pair",
      accessorKey: "pair",
    },
    {
      header: "Amount",
      accessorKey: "amount",
    },
    {
      header: "Status",
      accessorKey: "status",
    },
    {
      header: "Entry Price",
      accessorKey: "entryPrice",
    },
    {
      header: "Side",
      accessorKey: "side",
    },
    {
      header: "Type",
      accessorKey: "type",
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
