import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import InputText from "./index";
import CopyIcon from "assets/icons/copy-icon.svg";

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
