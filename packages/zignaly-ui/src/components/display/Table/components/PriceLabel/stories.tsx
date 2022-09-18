import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import PriceLabel from "./index";

export default {
  title: "Display/Table/Components/PriceLabel",
  component: PriceLabel,
  argTypes: {
    value: {
      control: "number",
      default: 50,
    },
    coin: {
      control: "text",
      default: "USDT",
    },
    fiat: {
      control: "boolean",
      default: false,
    },
    symbol: {
      control: "text",
      default: "$",
    },
  },
} as ComponentMeta<typeof PriceLabel>;

const Template: ComponentStory<typeof PriceLabel> = (args) => <PriceLabel {...args} />;

export const USDT = Template.bind({});
USDT.args = {
  value: 50,
  coin: "USDT",
  stableCoinOperative: false,
};

export const BTC = Template.bind({});
BTC.args = {
  value: 50,
  coin: "BTC",
  stableCoinOperative: false,
};

export const ETH = Template.bind({});
ETH.args = {
  value: 50,
  coin: "ETH",
  stableCoinOperative: false,
};

export const ZIG = Template.bind({});
ZIG.args = {
  value: 50,
  coin: "ZIG",
  stableCoinOperative: false,
};

export const BNB = Template.bind({});
BNB.args = {
  value: 50,
  coin: "BNB",
  stableCoinOperative: false,
};

export const USD = Template.bind({});
USD.args = {
  value: 50,
  coin: "USD",
  stableCoinOperative: true,
  symbol: "$",
};

export const EUR = Template.bind({});
EUR.args = {
  value: 50,
  coin: "EUR",
  stableCoinOperative: true,
  symbol: "€",
};
