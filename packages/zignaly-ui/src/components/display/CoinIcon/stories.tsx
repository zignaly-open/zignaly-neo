import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import CoinIcon, { CoinSizes } from "./index";

export default {
  title: "Display/CoinIcon",
  component: CoinIcon,
  argTypes: {
    size: {
      control: "select",
      default: CoinSizes.SMALL,
      options: [CoinSizes.SMALL, CoinSizes.MEDIUM, CoinSizes.LARGE],
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
  size: CoinSizes.MEDIUM,
  coin: "ETH",
};

export const BitcoinCoinIconStory = Template.bind({});
BitcoinCoinIconStory.args = {
  name: "Bitcoin",
  size: CoinSizes.LARGE,
  coin: "BTC",
};

export const TetherCoinIconStory = Template.bind({});
TetherCoinIconStory.args = {
  name: "Tether",
  size: CoinSizes.SMALL,
  coin: "USDT",
};
