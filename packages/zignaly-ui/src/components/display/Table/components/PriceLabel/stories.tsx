// Dependencies
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

// Components
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
  fiat: false,
};

export const BTC = Template.bind({});
BTC.args = {
  value: 50,
  coin: "BTC",
  fiat: false,
};

export const ETH = Template.bind({});
ETH.args = {
  value: 50,
  coin: "ETH",
  fiat: false,
};

export const ZIG = Template.bind({});
ZIG.args = {
  value: 50,
  coin: "ZIG",
  fiat: false,
};

export const BNB = Template.bind({});
BNB.args = {
  value: 50,
  coin: "BNB",
  fiat: false,
};

export const USD = Template.bind({});
USD.args = {
  value: 50,
  coin: "USD",
  fiat: true,
  symbol: "$",
};

export const EUR = Template.bind({});
EUR.args = {
  value: 50,
  coin: "EUR",
  fiat: true,
  symbol: "€",
};
