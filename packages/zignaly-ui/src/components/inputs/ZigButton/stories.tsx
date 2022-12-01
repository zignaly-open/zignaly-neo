import React from "react";
import "@mui/system";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import ZigButton from "./index";
import "@mui/system";
import { ButtonGroup } from "@mui/material";

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
      options: ["outlined", "contained"],
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

const TemplateGroup: ComponentStory<typeof ZigButton> = ({ variant, size, ...args }) => {
  return (
    <ButtonGroup variant={variant} size={size}>
      <ZigButton {...args} />
      <ZigButton {...args} />
      <ZigButton {...args} />
    </ButtonGroup>
  );
};

export const Group: ComponentMeta<typeof ZigButton> = TemplateGroup.bind({});
Group.args = {
  children: "Amount to Withdraw",
};
