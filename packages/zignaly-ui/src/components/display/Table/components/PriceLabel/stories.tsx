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
    token: {
      control: "string",
      default: "USDT",
    },
  },
} as ComponentMeta<typeof PriceLabel>;

const Template: ComponentStory<typeof PriceLabel> = (args) => <PriceLabel {...args} />;

export const USDT = Template.bind({});
USDT.args = {
  value: 50,
  token: "USDT",
};

export const BTC = Template.bind({});
BTC.args = {
  value: 50,
  token: "BTC",
};

export const ETH = Template.bind({});
ETH.args = {
  value: 50,
  token: "ETH",
};

export const ZIG = Template.bind({});
ZIG.args = {
  value: 50,
  token: "ZIG",
};

export const BNB = Template.bind({});
BNB.args = {
  value: 50,
  token: "BNB",
};
