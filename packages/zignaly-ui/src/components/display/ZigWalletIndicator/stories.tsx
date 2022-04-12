// Dependencies
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

// Component
import ZigWalletIndicator, { RankTypesId } from "./";

export default {
  title: "Display/ZigWalletIndicator",
  component: ZigWalletIndicator,
  argTypes: {
    zigs: {
      control: "text",
    },
    rankId: {
      control: "select",
      default: RankTypesId.WHALE,
      options: [RankTypesId.WHALE, RankTypesId.DOLPHIN],
    },
  },
  parameters: {
    jest: ["test.ts"],
  },
} as ComponentMeta<typeof ZigWalletIndicator>;

const Template: ComponentStory<typeof ZigWalletIndicator> = (args) => (
  <ZigWalletIndicator {...args} />
);

export const Dolphin = Template.bind({});
Dolphin.args = {};
