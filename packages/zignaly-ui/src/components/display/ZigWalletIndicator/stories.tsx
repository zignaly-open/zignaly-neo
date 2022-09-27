import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import ZigWalletIndicator, { RankTypesId } from "./";

export default {
  title: "Display/ZigWalletIndicator",
  component: ZigWalletIndicator,
  argTypes: {
    zigs: {
      control: "text",
      defaultValue: "1000000000000000000",
    },
    rankId: {
      control: "select",
      defaultValue: RankTypesId.WHALE,
      options: [RankTypesId.WHALE, RankTypesId.DOLPHIN],
    },
  },
  parameters: {
    jest: ["zigWalletIndicator"],
  },
} as ComponentMeta<typeof ZigWalletIndicator>;

const Template: ComponentStory<typeof ZigWalletIndicator> = (args) => (
  <ZigWalletIndicator {...args} />
);

export const Dolphin = Template.bind({});
Dolphin.args = {};
