import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import CoinIcon from "./index";
import { CoinSizes } from "./types";

export default {
  title: "Display/CoinIcon",
  component: CoinIcon,
  argTypes: {
    size: {
      control: "select",
      default: CoinSizes.Small,
      options: [CoinSizes.Small, CoinSizes.Medium, CoinSizes.Large],
    },
    name: {
      control: "text",
    },
    coin: {
      control: "text",
    },
  },
} as ComponentMeta<typeof CoinIcon>;

const Template: ComponentStory<typeof CoinIcon> = (args) => <CoinIcon {...args} />;

export const EtherCoinIconStory = Template.bind({});
EtherCoinIconStory.args = {
  name: "Ethereum",
  size: CoinSizes.Medium,
  coin: "ETH",
};

export const BitcoinCoinIconStory = Template.bind({});
BitcoinCoinIconStory.args = {
  name: "Bitcoin",
  size: CoinSizes.Large,
  coin: "BTC",
};

export const TetherCoinIconStory = Template.bind({});
TetherCoinIconStory.args = {
  name: "Tether",
  size: CoinSizes.Small,
  coin: "USDT",
};
