// Dependencies
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

// Components
import CoinLabel from "./index";

export default {
  title: "Display/Table/Components/CoinLabel",
  component: CoinLabel,
  argTypes: {
    name: {
      control: "text",
      default: "Teather",
    },
    coin: {
      control: "text",
      default: "USDT",
    },
  },
} as ComponentMeta<typeof CoinLabel>;

const Template: ComponentStory<typeof CoinLabel> = (args) => <CoinLabel {...args} />;

export const USDT = Template.bind({});
USDT.args = {
  name: "Teather",
  coin: "USDT",
};

export const BTC = Template.bind({});
BTC.args = {
  name: "Bitcoin",
  coin: "BTC",
};

export const ETH = Template.bind({});
ETH.args = {
  name: "Ethereum",
  coin: "ETH",
};

export const BNB = Template.bind({});
BNB.args = {
  name: "Binance Coin",
  coin: "BNB",
};
