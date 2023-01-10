import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import ZigCoinIcon, { CoinSizes } from "./index";

export default {
  title: "Display/CoinIcon",
  component: ZigCoinIcon,
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
} as ComponentMeta<typeof ZigCoinIcon>;

const Template: ComponentStory<typeof ZigCoinIcon> = (args) => <ZigCoinIcon {...args} />;

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
