import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Typography from "./";

export default {
  title: "Display/Typography",
  component: Typography,
  argTypes: {
    variant: {
      control: "select",
      options: ["h1", "h2", "h3", "h4", "h5", "body"],
    },
    weight: {
      control: "text",
    },
    size: {
      control: "select",
      options: ["medium", "small", "x-small"],
    },
    style: {
      control: "select",
      options: ["text", "number"],
    },
  },
  parameters: {
    jest: ["test.js"],
  },
} as ComponentMeta<typeof Typography>;

const Template: ComponentStory<typeof Typography> = (args) => <Typography {...args} />;

export const Text = Template.bind({});
Text.args = {
  children: "Example Title",
  variant: "h1",
};
