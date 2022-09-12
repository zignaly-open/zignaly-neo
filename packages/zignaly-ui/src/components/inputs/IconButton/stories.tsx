// Dependencies
import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

// Assets
import { ReactComponent as OptionDotsIcon } from "assets/icons/option-dots-icon.svg";

// Component
import IconButton from "./";

export default {
  title: "Inputs/IconButton",
  component: IconButton,

  argTypes: {
    variant: {
      options: ["primary", "secondary", "flat"],
      control: { type: "radio" },
    },
    disabled: {
      type: "boolean",
      defaultValue: false,
    },
    loading: {
      options: [true, false],
      control: { type: "radio" },
    },
    size: {
      options: ["small", "medium", "large", "xlarge"],
      control: { type: "radio" },
    },
  },
} as ComponentMeta<typeof IconButton>;

const templateStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const Template: ComponentStory<typeof IconButton> = (args) => (
  <div style={templateStyle}>
    <IconButton {...args} />
  </div>
);

export const Simple = Template.bind({});
Simple.args = {
  icon: <OptionDotsIcon color="#E1E9F0" />,
};
