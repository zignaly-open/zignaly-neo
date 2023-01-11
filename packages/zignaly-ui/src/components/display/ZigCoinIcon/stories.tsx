import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import ZigCoinIcon from "./index";

export default {
  title: "Display/ZigCoinIcon",
  component: ZigCoinIcon,
  argTypes: {
    size: {
      control: "select",
      default: "mediu,",
      options: ["small", "medium", "large"],
    },
    name: {
      control: "text",
    },
    coin: {
      control: "text",
    },
  },
} as ComponentMeta<typeof ZigCoinIcon>;

const Template: ComponentStory<typeof ZigCoinIcon> = (args) => <ZigCoinIcon {...args} />;

export const EtherCoinIconStory = Template.bind({});
EtherCoinIconStory.args = {
  name: "Ethereum",
  coin: "ETH",
};

export const BitcoinCoinIconStory = Template.bind({});
BitcoinCoinIconStory.args = {
  name: "Bitcoin",
  coin: "BTC",
};

export const TetherCoinIconStory = Template.bind({});
TetherCoinIconStory.args = {
  name: "Tether",
  coin: "USDT",
};
