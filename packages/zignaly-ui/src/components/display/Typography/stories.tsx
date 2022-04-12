import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Typography from "./";

export default {
  title: "Display/Typography",
  component: Typography,
  argTypes: {
    variant: {
      control: "select",
      options: ["h1", "h2", "h3", "h4", "h5", "body1", "body2"],
    },
    size: {
      control: "select",
      options: [
        "medium",
        "regular",
        "demibold",
        "demiboldUnderlined",
        "mediumUnderlined",
        "regularUnderlined",
      ],
    },
    style: {
      control: "select",
      options: ["text", "number"],
    },
    className: {
      table: {
        disable: true,
      },
    },
    component: {
      table: {
        disable: true,
      },
    },
    weight: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    jest: ["test.tsx"],
  },
} as ComponentMeta<typeof Typography>;

const Template: ComponentStory<typeof Typography> = (args) => <Typography {...args} />;

export const Text = Template.bind({});
Text.args = {
  children: "Example Title",
  variant: "h1",
};
