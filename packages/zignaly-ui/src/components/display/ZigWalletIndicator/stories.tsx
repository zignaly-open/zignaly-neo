// Dependencies
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

// Component
import ZigWalletIndicator from "./";

// Types
import { rankTypesId } from "types/ranks";

export default {
  title: "Display/ZigWalletIndicator",
  component: ZigWalletIndicator,
  argTypes: {
    zigs: {
      control: "text",
    },
    rankId: {
      control: "select",
      default: rankTypesId.WHALE,
      options: [rankTypesId.WHALE, rankTypesId.DOLPHIN],
    },
  },
  parameters: {
    jest: ["test.js"],
  },
} as ComponentMeta<typeof ZigWalletIndicator>;

const Template: ComponentStory<typeof ZigWalletIndicator> = (args) => (
  <ZigWalletIndicator {...args} />
);

export const Dolphin = Template.bind({});
Dolphin.args = {};
