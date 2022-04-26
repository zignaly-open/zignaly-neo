// Dependencies
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

// Components
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

export const CoinIconStory = Template.bind({});
CoinIconStory.args = {
  name: "Ethereum",
  size: CoinSizes.MEDIUM,
  coin: "ETH",
};
