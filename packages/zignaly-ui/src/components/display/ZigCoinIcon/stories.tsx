import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import ZigCoinIcon from "./index";

export default {
  title: "Display/ZigCoinIcon",
  component: ZigCoinIcon,
  argTypes: {
    size: {
      control: "select",
      default: "medium",
      options: ["small", "medium", "large"],
    },
    coin: {
      control: "text",
    },
  },
} as ComponentMeta<typeof ZigCoinIcon>;

const Template: ComponentStory<typeof ZigCoinIcon> = (args) => <ZigCoinIcon {...args} />;

export const EtherIconStory = Template.bind({});
EtherIconStory.args = {
  coin: "ETH",
};

export const BitcoinIconStory = Template.bind({});
BitcoinIconStory.args = {
  coin: "BTC",
};

export const TetherIconStory = Template.bind({});
TetherIconStory.args = {
  coin: "USDT",
};
