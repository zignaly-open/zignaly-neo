import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import InputText from "./index";
import CopyIcon from "assets/icons/copy-icon.svg?url";

export default {
  title: "Inputs/InputText",
  component: InputText,
  argTypes: {
    label: {
      type: "string",
    },
    placeholder: {
      type: "string",
    },
    disabled: {
      type: "boolean",
      defaultValue: false,
    },
    defaultValue: {
      type: "string",
    },
    readOnly: {
      type: "boolean",
      defaultValue: false,
    },
    error: {
      type: "string",
      defaultValue: "",
    },
    rightSideElement: {
      options: { true: CopyIcon, false: null },
      control: { type: "radio" },
    },
    onChange: {
      disabled: true,
    },
  },
} as ComponentMeta<typeof InputText>;

const Template: ComponentStory<typeof InputText> = (args) => <InputText {...args} />;

export const TextInputer = Template.bind({});
TextInputer.args = {
  label: "Amount to Withdraw",
};

export const TextareaInputer = Template.bind({});
TextareaInputer.args = {
  value:
    "https://zignaly.com/api/signals.php?key=YOURSECRETKEY&type=entry&exchange=zignaly&pair=ethusdt&orderType=limit&positionSize=10&signalId=123&limitPrice=3420&takeProfitPercentage1=20&takeProfitAmountPercentage1=100&stopLossPercentage=-5",
  multiline: true,
  label: "Label",
};
