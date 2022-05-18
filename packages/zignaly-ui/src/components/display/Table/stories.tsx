// Dependencies
import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import NumberFormat from "react-number-format";

// Component
import Table from "./";
import PriceLabel from "./components/PriceLabel";
import CoinLabel from "./components/CoinLabel";
import PercentageIndicator from "./components/PercentageIndicator";
import ConnectionStateLabel, { ConnectionStateLabelId } from "./components/ConnectionStateLabel";
import Button from "components/inputs/Button";
import DateLabel from "./components/DateLabel";

// Styles
import { Actions, CheckIconStyled, CloseIconStyled } from "./styles";
import { dark } from "../../../theme";

// Utils
import {sortByPointDecimal} from "../../../utils/numbers";

export default {
  title: "Display/Table",
  component: Table,
} as ComponentMeta<typeof Table>;

const Template: ComponentStory<typeof Table> = (args) => <Table {...args} />;
/**
 * All the columns that include PriceLabel need to pass to their column isAlignThRight: true,
 * so that they are well aligned, it was requested that the design be like this
 * IMPORTANT if there are amounts of money use the sortByPointDecimal function to sort.
 * IMPORTANT useMemo must be used and in the following way wrap the result of the sort function executed in a variable because if not it will not be memorized,
 * it will create a new function whenever it is always executed
 */
export const MyCoins = Template.bind({});
MyCoins.args = {
  columns: [
    {
      Header: "Coin",
      accessor: "coin",
    },
    {
      Header: "Total Balance",
      accessor: "totalBalance",
      // @ts-ignore
      isAlignThRight: true,
      sortType: sortByPointDecimal(),
    },
    {
      Header: "Available Balance",
      accessor: "availableBalance",
      // @ts-ignore
      isAlignThRight: true,
      sortType: sortByPointDecimal(),
    },
    {
      Header: "Locked Balance",
      accessor: "lockedBalance",
      // @ts-ignore
      isAlignThRight: true,
      sortType: sortByPointDecimal(),
    },
    {
      Header: "Value in BTC",
      accessor: "valueInBtc",
      // @ts-ignore
      isAlignThRight: true,
      sortType: sortByPointDecimal(),
    },
    {
      Header: "Value in USD",
      accessor: "valueInUsd",
      // @ts-ignore
      isAlignThRight: true,
      sortType: sortByPointDecimal(),
    },
  ],
  data: [
    {
      coin: <CoinLabel coin={"ETH"} name={"Ethereum"} />,
      totalBalance: <PriceLabel coin={"ETH"} value={"3.200"} />,
      availableBalance: <PriceLabel coin={"ETHAS"} value={"2.13521254"} />,
      lockedBalance: <PriceLabel coin={"ETHA"} value={"30.18389589"} />,
      valueInBtc: <PriceLabel coin={"BTC"} value={"0.78232496"} />,
      valueInUsd: <PriceLabel coin={"USD"} value={"3.200"} fiat />,
      action: (
        <Actions>
          <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
          <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
        </Actions>
      ),
    },
    {
      coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
      totalBalance: <PriceLabel coin={"BTC"} value={"18.20435"} />,
      availableBalance: <PriceLabel coin={"BTC"} value={"6.7352"} />,
      lockedBalance: <PriceLabel coin={"BTC"} value={"50.18389"} />,
      valueInBtc: <PriceLabel coin={"BTC"} value={"7.382324"} />,
      valueInUsd: <PriceLabel coin={"USD"} value={"54000"} fiat />,
      action: (
        <Actions>
          <Button caption={"Deposit"} size={"small"} variant={"secondary"} onClick={() => {}} />
          <Button caption={"Withdraw"} size={"small"} variant={"secondary"} onClick={() => {}} />
        </Actions>
      ),
    },
    {
      coin: <CoinLabel coin={"BNB"} name={"Bianance Coin"} />,
      totalBalance: <PriceLabel coin={"BNB"} value={"190"} />,
      availableBalance: <PriceLabel coin={"BNB"} value={"5.1352"} />,
      lockedBalance: <PriceLabel coin={"BNB"} value={"1220"} />,
      valueInBtc: <PriceLabel coin={"BTC"} value={"21.782324"} />,
      valueInUsd: <PriceLabel symbol={"€"} coin={"EUR"} value={"400.50"} fiat />,
      action: (
        <Actions>
          <Button
            caption={"Deposit"}
            color="grey"
            variant={"secondary"}
            size={"small"}
            onClick={() => {}}
          />
          <Button
            caption={"Withdraw"}
            color="grey"
            variant={"secondary"}
            size={"small"}
            onClick={() => {}}
          />
        </Actions>
      ),
    },
  ],
};

export const Investors = Template.bind({});
Investors.args = {
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
      // @ts-ignore
      isAlignThRight: true,
      sortType: sortByPointDecimal(),
    },
    {
      Header: "P & L",
      accessor: "pyd",
      // @ts-ignore
      isAlignThRight: true,
      sortType: sortByPointDecimal(),
    },
    {
      Header: "P & L Total",
      accessor: "pydTotal",
      // @ts-ignore
      isAlignThRight: true,
      sortType: sortByPointDecimal(),
    },
    {
      Header: "Total Fees Paid",
      accessor: "totalFeesPaid",
      // @ts-ignore
      isAlignThRight: true,
      sortType: sortByPointDecimal(),
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
      email: "tec**@zig**.com",
      userId: "5f886d29da8e9666b1684c9a",
      investment: <PriceLabel coin={"USDT"} value={"1250"} />,
      pyd: (
        <PriceLabel
          coin={"USDT"}
          value={"37.5"}
          bottomElement={<PercentageIndicator value={3} theme={dark} />}
        />
      ),
      pydTotal: <PriceLabel coin={"USDT"} value={"145"} />,
      totalFeesPaid: <PriceLabel coin={"USDT"} value={"218"} />,
      successFee: "10%",
      feesInZig: <CheckIconStyled width="24" height="24" color={dark["neutral300"]} />,
      status: <ConnectionStateLabel stateId={ConnectionStateLabelId.CONNECTED} />,
    },
    {
      email: "tec**@zig**.com",
      userId: "5f886d29da8e9666b1684c9a",
      investment: <PriceLabel coin={"USDT"} value={"1250"} />,
      pyd: (
        <PriceLabel
          coin={"USDT"}
          value={"0.85"}
          bottomElement={<PercentageIndicator value={-1} theme={dark} />}
        />
      ),
      pydTotal: <PriceLabel coin={"USDT"} value={"23.68586856858"} />,
      totalFeesPaid: <PriceLabel coin={"USDT"} value={"71813"} />,
      successFee: "10%",
      feesInZig: <CloseIconStyled width="24" height="24" color={dark["neutral300"]} />,
      status: <ConnectionStateLabel stateId={ConnectionStateLabelId.DISCONNECTED} />,
    },

    {
      email: "tec**@zig**.com",
      userId: "5f886d29da8e9666b1684c9a",
      investment: <PriceLabel coin={"USDT"} value={"3468"} />,
      pyd: (
          <PriceLabel
              coin={"USDT"}
              value={"637956.523"}
              bottomElement={<PercentageIndicator value={-3} theme={dark} />}
          />
      ),
      pydTotal: <PriceLabel coin={"USDT"} value={"0.347347"} />,
      totalFeesPaid: <PriceLabel coin={"USDT"} value={"09864"} />,
      successFee: "10%",
      feesInZig: <CloseIconStyled width="24" height="24" color={dark["neutral300"]} />,
      status: <ConnectionStateLabel stateId={ConnectionStateLabelId.HARD_DISCONNECT} />,
    },
    {
      email: "tec**@zig**.com",
      userId: "5f886d29da8e9666b1684c9a",
      investment: <PriceLabel coin={"USDT"} value={"1250"} />,
      pyd: (
        <PriceLabel
          coin={"USDT"}
          value={"1929292"}
          bottomElement={<PercentageIndicator value={-87} theme={dark} />}
        />
      ),
      pydTotal: <PriceLabel coin={"USDT"} value={"134581"} />,
      totalFeesPaid: <PriceLabel coin={"USDT"} value={"218"} />,
      successFee: "10%",
      feesInZig: <CloseIconStyled width="24" height="24" color={dark["neutral300"]} />,
      status: <ConnectionStateLabel stateId={ConnectionStateLabelId.SOFT_DISCONNECT} />,
    },
    {
      email: "tec**@zig**.com",
      userId: "5f886d29da8e9666b1684c9a",
      investment: <PriceLabel coin={"USDT"} value={"1250"} />,
      pyd: (
        <PriceLabel
          coin={"USDT"}
          value={"30.5"}
          bottomElement={<PercentageIndicator value={-1} theme={dark} />}
        />
      ),
      pydTotal: <PriceLabel coin={"USDT"} value={"145"} />,
      totalFeesPaid: <PriceLabel coin={"USDT"} value={"218"} />,
      successFee: "10%",
      feesInZig: <CloseIconStyled width="24" height="24" color={dark["neutral300"]} />,
      status: <ConnectionStateLabel stateId={ConnectionStateLabelId.SUSPENDED} />,
    },
  ],
};

export const ExchangeOrders = Template.bind({});
ExchangeOrders.args = {
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
      sortType: sortByPointDecimal(),
    },
    {
      Header: "Status",
      accessor: "status",
    },
    {
      Header: "Entry Price",
      accessor: "entryPrice",
      sortType: sortByPointDecimal(),
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
      amount: <NumberFormat
          value={35.978087076}
          displayType={"text"}
          thousandSeparator={true}
      />,
      status: "Open",
      entryPrice: <NumberFormat
          value={"110.20"}
          displayType={"text"}
          thousandSeparator={true}
      />,
      side: "Buy",
      type: "Limit",
    },
    {
      date: <DateLabel date={new Date("December 15, 1997 20:10:00")} />,
      orderId: "248495028471",
      pair: "XML/USDT",
      amount: <NumberFormat
          value={2352}
          displayType={"text"}
          thousandSeparator={true}
      />,
      status: "Open",
      entryPrice: <NumberFormat
          value={"21077.20"}
          displayType={"text"}
          thousandSeparator={true}
      />,
      side: "Buy",
      type: "Limit",
    },
    {
      date: <DateLabel date={new Date("December 7, 1997 20:10:00")} />,
      orderId: "358495028471",
      pair: "XML/USDT",
      amount: <NumberFormat
          value={643745}
          displayType={"text"}
          thousandSeparator={true}
      />,
      status: "Open",
      entryPrice: <NumberFormat
          value={"3109.60"}
          displayType={"text"}
          thousandSeparator={true}
      />,
      side: "Buy",
      type: "Limit",
    },
  ],
};
