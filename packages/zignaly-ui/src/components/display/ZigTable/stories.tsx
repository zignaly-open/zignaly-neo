import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { NumericFormat } from "react-number-format";
import ZigTable from ".";
import PercentageIndicator from "../Table/components/PercentageIndicator";
import ConnectionStateLabel from "../Table/components/ConnectionStateLabel";
import DateLabel from "../Table/components/DateLabel";
import CoinLabel from "../Table/components/CoinLabel";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { makeCoinsData, makeExchangeOrdersData, makeInvestorsData } from "./makeData";
import { ZigTablePriceLabel } from "../ZigPriceLabel";
import ZigButton from "components/inputs/ZigButton";
import { Box } from "@mui/material";
import PriceLabel, { UsdPriceLabel } from "../Table/components/PriceLabel";
import ZigTypography from "../ZigTypography";
import { Check, Close } from "@mui/icons-material";

const exchangeOrdersData = makeExchangeOrdersData(10);
const columnHelperExchangeOrders = createColumnHelper<typeof exchangeOrdersData[number]>();
const exchangeOrdersColumns = [
  columnHelperExchangeOrders.accessor("date", {
    header: "Date",
    cell: (props) => <DateLabel date={new Date(props.getValue())} />,
  }),
  columnHelperExchangeOrders.accessor("orderId", {
    header: "Order ID",
  }),
  columnHelperExchangeOrders.accessor("pair", {
    header: "Pair",
  }),
  columnHelperExchangeOrders.accessor("amount", {
    header: "Amount",
    cell: (props) => <NumericFormat value={props.getValue()} displayType="text" />,
  }),
  columnHelperExchangeOrders.accessor("status", {
    header: "Status",
  }),
  columnHelperExchangeOrders.accessor("entryPrice", {
    header: "Entry Price",
    cell: (props) => <NumericFormat value={props.getValue()} displayType="text" />,
  }),
  columnHelperExchangeOrders.accessor("side", {
    header: "Side",
  }),
  columnHelperExchangeOrders.accessor("type", {
    header: "Type",
  }),
];

const userTableData = [
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
    threeMonths: { value: 20 },
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
    threeMonths: { value: 20 },
    all: { value: 20 },
  },
];
const columnHelperUserTable = createColumnHelper<typeof userTableData[number]>();
const userTableColumns = [
  columnHelperUserTable.accessor("summary", {
    header: "My Current Value",
    meta: { subtitle: "Returns" },
  }),
  // columnHelperUserTable.accessor("chart", {
  //   header: "Since Invested",
  //   cell: ({ row: { original } }) => (
  //     <AreaChart variant={original.chart.variant as any} data={original.chart.data} />
  //   ),
  //   enableSorting: false,
  // }),
  columnHelperUserTable.accessor("dailyAvg.value", {
    header: "Daily avg",
    cell: ({ getValue }) => <PercentageIndicator value={getValue()} />,
  }),
  columnHelperUserTable.accessor("oneMonth.value", {
    header: "1 mo.",
    cell: ({ getValue }) => <PercentageIndicator value={getValue()} />,
  }),
  columnHelperUserTable.accessor("threeMonths.value", {
    header: "3 mo.",
    cell: ({ getValue }) => <PercentageIndicator value={getValue()} />,
  }),
  columnHelperUserTable.accessor("all.value", {
    header: "All",
    cell: ({ getValue }) => <PercentageIndicator value={getValue()} />,
  }),
];

const myCoinsTableData = makeCoinsData(50);
const columnHelperMyCoins = createColumnHelper<typeof myCoinsTableData[number]>();
const myCoinsTableColumns = [
  columnHelperMyCoins.accessor("coin.coin", {
    header: "Coin",
    cell: ({ getValue, row: { original } }) => (
      <CoinLabel coin={getValue()} name={original.coin.name} />
    ),
  }),
  columnHelperMyCoins.accessor("totalBalance.value", {
    header: "Total Balance",
    cell: ({ getValue, row: { original } }) => (
      <ZigTablePriceLabel
        color="neutral100"
        coinProps={{ color: "neutral400" }}
        coin={original.totalBalance.coin}
        value={getValue()}
      />
    ),
  }),
  columnHelperMyCoins.accessor("availableBalance.value", {
    header: "Available Balance",
    cell: ({ getValue, row: { original } }) => (
      <ZigTablePriceLabel coin={original.totalBalance.coin} value={getValue()} />
    ),
  }),
  columnHelperMyCoins.accessor("lockedBalance.value", {
    header: "Locked Balance",
    cell: ({ getValue, row: { original } }) => (
      <ZigTablePriceLabel coin={original.totalBalance.coin} value={getValue()} />
    ),
  }),
  columnHelperMyCoins.accessor("valueInBtc.value", {
    header: "Value in BTC",
    cell: ({ getValue, row: { original } }) => (
      <ZigTablePriceLabel coin={original.totalBalance.coin} value={getValue()} />
    ),
  }),
  columnHelperMyCoins.accessor("valueInUsd.value", {
    header: "Value in USD",
    cell: ({ getValue }) => <UsdPriceLabel value={getValue()} />,
  }),
  columnHelperMyCoins.display({
    header: "",
    id: "action",
    cell: () => (
      <Box display="flex" gap={1}>
        <ZigButton size="small" variant="outlined" onClick={() => {}}>
          Deposit
        </ZigButton>
        <ZigButton size="small" variant="outlined" onClick={() => {}}>
          Withdraw
        </ZigButton>
      </Box>
    ),
  }),
];

const investorsTableData = makeInvestorsData(10);
const investorsTableColumns: ColumnDef<typeof investorsTableData[number], any>[] = [
  {
    header: "Email",
    accessorKey: "email",
    cell: ({ getValue }) => (
      <ZigTypography color="neutral100" variant="body2">
        {getValue()}
      </ZigTypography>
    ),
  },
  {
    header: "User ID",
    accessorKey: "userId",
    cell: ({ getValue }) => (
      <ZigTypography color="neutral200" variant="h5">
        {getValue()}
      </ZigTypography>
    ),
  },
  {
    header: "Investment",
    accessorKey: "investment",
    cell: ({ getValue, row: { original } }) => (
      <ZigTablePriceLabel coin={original.coin} value={getValue()} />
    ),
  },
  {
    header: "P & L",
    accessorKey: "pnl",
    cell: ({ getValue, row: { original } }) => (
      <PriceLabel
        coin={original.coin}
        value={getValue()}
        bottomElement={<PercentageIndicator value={3} />}
      />
    ),
  },
  {
    header: "P & L Total",
    accessorKey: "pnlTotal",
    cell: ({ getValue, row: { original } }) => (
      <ZigTablePriceLabel coin={original.coin} value={getValue()} />
    ),
  },
  {
    header: "Total Fees Paid",
    accessorKey: "totalFeesPaid",
    cell: ({ getValue, row: { original } }) => (
      <ZigTablePriceLabel coin={original.coin} value={getValue()} />
    ),
  },
  {
    header: "Success Fee",
    accessorKey: "successFee",
    cell: ({ getValue }) => (
      <ZigTypography color="neutral100" variant="body1">
        {getValue()}%
      </ZigTypography>
    ),
  },
  {
    header: "Fees in ZIG",
    accessorKey: "feesInZig",
    cell: ({ getValue }) =>
      getValue() ? (
        <Check width="24" height="24" sx={{ color: "neutral300" }} />
      ) : (
        <Close width="24" height="24" sx={{ color: "neutral300" }} />
      ),
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ getValue }) => <ConnectionStateLabel stateId={getValue()} />,
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
        id: "totalBalance_value",
        desc: true,
      },
    ],
  },
  // @ts-ignore Property 'accessorFn' is missing in type (storybook only), god help me.
  columns: myCoinsTableColumns,
  data: myCoinsTableData,
};

export const Investors = Template.bind({});
Investors.args = {
  // @ts-ignore
  columns: investorsTableColumns,
  data: investorsTableData,
};

export const UserDashBoard = Template.bind({});
UserDashBoard.args = {
  // @ts-ignore
  columns: userTableColumns,
  data: userTableData,
};

export const ExchangeOrders = Template.bind({});
ExchangeOrders.args = {
  // @ts-ignore
  columns: exchangeOrdersColumns,
  data: exchangeOrdersData,
};
