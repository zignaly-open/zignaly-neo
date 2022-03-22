// Dependencies
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

// Assets
import OptionsDotsIcon from "assets/icons/option-dots-icon.svg";
import CheckIcon from "assets/icons/check-icon.svg";
import CloseIcon from "assets/icons/close-icon.svg";

// Component
import Table from "./";
import PriceLabel from "components/display/Table/components/PriceLabel";
import PercentageIndicator from "components/display/Table/components/PercentageIndicator";
import ConnectionStateLabel from "components/display/Table/components/ConnectionStateLabel";
import TableButton from "components/display/Table/components/TableButton";
import IconButton from "components/inputs/IconButton";
import { ButtonGroup } from "components/styled";

// Types
import { connectionStateTypesId } from "components/display/Table/components/ConnectionStateLabel/types";
import { buttonVariantsId } from "types/buttons";

// Utils
import { shortenHex } from "utils/web3";
import DateLabel from "components/display/Table/components/DateLabel";

export default {
  title: "Display/Table",
  component: Table,
} as ComponentMeta<typeof Table>;

const Template: ComponentStory<typeof Table> = (args) => <Table {...args} />;

export const Investors = Template.bind({});
Investors.args = {
  columns: [
    {
      Header: "User ID",
      accessor: "userId",
    },
    {
      Header: "Email",
      accessor: "email",
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
    {
      Header: <IconButton variant={buttonVariantsId.PLACEHOLDER} icon={OptionsDotsIcon} />,
      accessor: "action",
      disableSortBy: true,
    },
  ],
  data: [
    {
      userId: shortenHex("5f886d29da8e9666b1684c9a"),
      email: "tec**@zig**.com",
      investment: <PriceLabel token={"USDT"} value={"1250"} />,
      pyd: (
        <PriceLabel
          token={"USDT"}
          value={"37.5"}
          bottomElement={<PercentageIndicator value={3} />}
        />
      ),
      pydTotal: <PriceLabel token={"USDT"} value={"145"} />,
      totalFeesPaid: <PriceLabel token={"USDT"} value={"218"} />,
      successFee: "10%",
      feesInZig: <img src={CheckIcon} />,
      status: <ConnectionStateLabel stateId={connectionStateTypesId.CONNECTED} />,
      action: <IconButton icon={OptionsDotsIcon} />,
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
    {
      Header: (
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <IconButton variant={buttonVariantsId.PLACEHOLDER} icon={OptionsDotsIcon} />
        </div>
      ),
      accessor: "action",
      disableSortBy: true,
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
      action: (
        <ButtonGroup>
          <TableButton icon={CloseIcon} caption={"Close"} />
        </ButtonGroup>
      ),
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
    {
      Header: (
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <IconButton variant={buttonVariantsId.PLACEHOLDER} icon={OptionsDotsIcon} />
        </div>
      ),
      accessor: "action",
      disableSortBy: true,
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
      action: (
        <ButtonGroup>
          <TableButton icon={CloseIcon} caption={"Close"} />
        </ButtonGroup>
      ),
    },
  ],
};
