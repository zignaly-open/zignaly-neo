import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import ZigPriceLabel from "./index";

export default {
  title: "Display/ZigPriceLabel",
  component: ZigPriceLabel,
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
} as ComponentMeta<typeof ZigPriceLabel>;

const Template: ComponentStory<typeof ZigPriceLabel> = (args) => <ZigPriceLabel {...args} />;

export const USDT = Template.bind({});
USDT.args = {
  value: 50,
  coin: "USDT",
};

export const ETH = Template.bind({});
ETH.args = {
  value: Math.PI,
  coin: "ETH",
};

export const Dollars = Template.bind({});
Dollars.args = {
  value: Math.PI,
  usd: true,
};

export const Styled = Template.bind({});
Styled.args = {
  fontWeight: "bold",
  color: "greenGraph", // todo: rename those stupid colors to green and red
  value: 500000000,
  variant: "h1",
  coin: "BTC",
  sx: {
    textDecoration: "underline",
    background: "rgba(0,0,0,.5)",
    border: "3px dashed green",
    display: "inline-block",
    padding: "20px",
  },
  coinProps: {
    fontWeight: 800,
    variant: "h1",
    sx: {
      display: "inline-block",
      color: "red",
    },
  },
};

export const Precision = Template.bind({});
Precision.args = {
  precision: 3,
  coin: "BTC",
  value: Math.PI,
};
