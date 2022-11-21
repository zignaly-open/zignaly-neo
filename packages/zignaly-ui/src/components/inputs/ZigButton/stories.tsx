import React from "react";
import "@mui/system";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import ZigButton from "./index";
import "@mui/system";

const result: ComponentMeta<typeof ZigButton> = {
  title: "Inputs/ZigButton",
  component: ZigButton,
  argTypes: {
    children: {
      type: "string",
    },
    disabled: {
      type: "boolean",
      defaultValue: false,
    },
    variant: {
      control: {
        type: "select",
      },
      options: ["primary", "outlined", "contained"],
    },
    size: {
      control: {
        type: "select",
      },
      options: ["small", "medium", "large"],
    },
  },
};

export default result;

const Template: ComponentStory<typeof ZigButton> = (args) => <ZigButton {...args} />;

export const Default: ComponentMeta<typeof ZigButton> = Template.bind({});
Default.args = {
  children: "Amount to Withdraw",
};
