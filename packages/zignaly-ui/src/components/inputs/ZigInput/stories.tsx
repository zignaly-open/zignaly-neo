import React from "react";
import "@mui/system";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import InputText from "./index";
import "@mui/system";

const result: ComponentMeta<typeof InputText> = {
  title: "Inputs/ZigInput",
  component: InputText,
  argTypes: {
    label: {
      type: "string",
    },
    placeholder: {
      type: "string",
    },
    wide: {
      type: "boolean",
      defaultValue: false,
    },
    disabled: {
      type: "boolean",
      defaultValue: false,
    },
    defaultValue: {
      type: "string",
    },
    error: {
      type: "string",
      defaultValue: "",
    },
  },
};

export default result;

const Template: ComponentStory<typeof InputText> = (args) => <InputText {...args} />;

export const TextInputer: ComponentMeta<typeof InputText> = Template.bind({});
TextInputer.args = {
  label: "Amount to Withdraw",
  placeholder: "Amount to Withdraw",
};

export const TextareaInputer: ComponentMeta<typeof InputText> = Template.bind({});
TextareaInputer.args = {
  value:
    "https://zignaly.com/api/signals.php?key=YOURSECRETKEY&type=entry&exchange=zignaly&pair=ethusdt&orderType=limit&positionSize=10&signalId=123&limitPrice=3420&takeProfitPercentage1=20&takeProfitAmountPercentage1=100&stopLossPercentage=-5",
  multiline: true,
  label: "Label",
};
