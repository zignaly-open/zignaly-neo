// Dependencies
import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

// Assets
import CheckIcon from "../../../assets/icons/check-icon.svg";

// Component
import Table from "./";
import Typography from "components/display/Typography";
import PriceLabel from "./components/PriceLabel";
import CoinLabel from "./components/CoinLabel";
import PercentageIndicator from "./components/PercentageIndicator";
import ConnectionStateLabel, { ConnectionStateLabelId } from "./components/ConnectionStateLabel";
import Button from "components/inputs/Button";
import DateLabel from "./components/DateLabel";

// Styles
import { Actions, InvestorLabel } from "./styles";

export default {
  title: "Display/Table",
  component: Table,
} as ComponentMeta<typeof Table>;

const Template: ComponentStory<typeof Table> = (args) => <Table {...args} />;
/**
 * All the columns that include PriceLabel need to pass to their column isAlignThRight: true,
 * so that they are well aligned, it was requested that the design be like this
 */
export const MyCoins = Template.bind({});
MyCoins.args = {
  columns: [
    {
      Header: <Typography color={"neutral200"} variant={"body2"} weight={"regular"}>{"Coin"}</Typography>,
      accessor: "coin",
    },
    {
      Header: <Typography color={"neutral200"} variant={"body2"} weight={"regular"}>{"Total Balance"}</Typography>,
      accessor: "totalBalance",
      // @ts-ignore
      isAlignThRight: true,
    },
    {
      Header: <Typography color={"neutral200"} variant={"body2"} weight={"regular"}>{"Available Balance"}</Typography>,
      accessor: "availableBalance",
      // @ts-ignore
      isAlignThRight: true,
    },
    {
      Header: <Typography color={"neutral200"} variant={"body2"} weight={"regular"}>{"Locked Balance"}</Typography>,
      accessor: "lockedBalance",
      // @ts-ignore
      isAlignThRight: true,
    },
    {
      Header: <Typography color={"neutral200"} variant={"body2"} weight={"regular"}>{"Value BTC"}</Typography>,
      accessor: "valueInBtc",
      // @ts-ignore
      isAlignThRight: true,
    },
    {
      Header: <Typography color={"neutral200"} variant={"body2"} weight={"regular"}>{"Value in USD"}</Typography>,
      accessor: "valueInUsd",
      // @ts-ignore
      isAlignThRight: true,
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
          <Button caption={"Deposit"} variant={"secondary"} onClick={() => {}} />
          <Button caption={"Withdraw"} variant={"secondary"} onClick={() => {}} />
        </Actions>
      ),
    },
    {
      coin: <CoinLabel coin={"BTC"} name={"Bitcoin"} />,
      totalBalance: <PriceLabel coin={"BTC"} value={"32.20435"} />,
      availableBalance: <PriceLabel coin={"BTC"} value={"2.1352"} />,
      lockedBalance: <PriceLabel coin={"BTC"} value={"30.18389"} />,
      valueInBtc: <PriceLabel coin={"BTC"} value={"0.782324"} />,
      valueInUsd: <PriceLabel coin={"USD"} value={"34,000"} fiat />,
      action: (
        <Actions>
          <Button caption={"Deposit"} variant={"secondary"} onClick={() => {}} />
          <Button caption={"Withdraw"} variant={"secondary"} onClick={() => {}} />
        </Actions>
      ),
    },
    {
      coin: <CoinLabel coin={"BNB"} name={"Bianance Coin"} />,
      totalBalance: <PriceLabel coin={"BNB"} value={"350"} />,
      availableBalance: <PriceLabel coin={"BNB"} value={"2.1352"} />,
      lockedBalance: <PriceLabel coin={"BNB"} value={"350"} />,
      valueInBtc: <PriceLabel coin={"BTC"} value={"0.782324"} />,
      valueInUsd: <PriceLabel coin={"EUR"} value={"400"} fiat />,
      action: (
        <Actions>
          <Button caption={"Deposit"} variant={"secondary"} onClick={() => {}} />
          <Button caption={"Withdraw"} variant={"secondary"} onClick={() => {}} />
        </Actions>
      ),
    },
  ],
};

export const Investors = Template.bind({});
Investors.args = {
  columns: [
    {
      Header: <Typography color={"neutral200"} variant={"body2"} weight={"regular"}>{"User ID"}</Typography>,
      accessor: "userId",
    },
    {
      Header: <Typography color={"neutral200"} variant={"body2"} weight={"regular"}>{"Email"}</Typography>,
      accessor: "email",
    },
    {
      Header: <Typography color={"neutral200"} variant={"body2"} weight={"regular"}>{"Investment"}</Typography>,
      accessor: "investment",
      // @ts-ignore
      isAlignThRight: true,
    },
    {
      Header: <Typography color={"neutral200"} variant={"body2"} weight={"regular"}>{"P & L"}</Typography>,
      accessor: "pyd",
      // @ts-ignore
      isAlignThRight: true,
    },
    {
      Header: <Typography color={"neutral200"} variant={"body2"} weight={"regular"}>{"P & L Total"}</Typography>,
      accessor: "pydTotal",
      // @ts-ignore
      isAlignThRight: true,
    },
    {
      Header: <Typography color={"neutral200"} variant={"body2"} weight={"regular"}>{"Total Fees Paid"}</Typography>,
      accessor: "totalFeesPaid",
      // @ts-ignore
      isAlignThRight: true,
    },
    {
      Header: <Typography color={"neutral200"} variant={"body2"} weight={"regular"}>{"Success Fee"}</Typography>,
      accessor: "successFee",
    },
    {
      Header: <Typography color={"neutral200"} variant={"body2"} weight={"regular"}>{"Fees in ZIG"}</Typography>,
      accessor: "feesInZig",
    },
    {
      Header: <Typography color={"neutral200"} variant={"body2"} weight={"regular"}>{"Status"}</Typography>,
      accessor: "status",
    },
  ],
  data: [
    {
      userId: (
        <InvestorLabel color={"neutral100"} variant={"h3"}>
          {"5f886d29da8e9666b1684c9a"}
        </InvestorLabel>
      ),
      email: (
        <InvestorLabel color={"neutral100"} variant={"h3"}>
          {"tec**@zig**.com"}
        </InvestorLabel>
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
        <InvestorLabel color={"neutral100"} variant={"h3"}>
          {"10%"}
        </InvestorLabel>
      ),
      feesInZig: <img src={CheckIcon} />,
      status: <ConnectionStateLabel stateId={ConnectionStateLabelId.CONNECTED} />,
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
      date: <DateLabel date={new Date()} />,
      orderId: "138495028471",
      pair: "XML/USDT",
      amount: 25,
      status: "Open",
      entryPrice: "110.20",
      side: "Buy",
      type: "Limit",
    },
  ],
};

export const Contracts = Template.bind({});
Contracts.args = {
  columns: [
    {
      Header: "Date",
      accessor: "date",
    },
    {
      Header: "Order ID",
      accessor: "positionId",
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
      Header: "Side",
      accessor: "side",
    },
    {
      Header: "Entry Price",
      accessor: "entryPrice",
    },
    {
      Header: "Market Price",
      accessor: "marketPrice",
    },
    {
      Header: "Margin",
      accessor: "margin",
    },
  ],
  data: [
    {
      date: <DateLabel date={new Date()} />,
      positionId: <div style={{ color: "#706F82" }}>mhAtXCp3BoaWgE5G8JJFD</div>,
      pair: "XML/USDT",
      amount: 25,
      side: "Both",
      entryPrice: "110.20",
      marketPrice: "114.20",
      margin: "Cross",
    },
  ],
};
