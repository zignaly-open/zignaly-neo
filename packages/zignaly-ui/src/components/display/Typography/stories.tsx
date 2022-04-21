import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Typography from "./";

export default {
  title: "Display/Typography",
  component: Typography,
  argTypes: {
    variant: {
      control: "select",
      options: ["h1", "h2", "h3", "h4", "h5", "bigNumber", "body1", "body2"],
    },
    weight: {
      control: "select",
      options: ["medium", "regular", "demibold"],
    },
    underline: {
      control: "radio",
      options: [true, false],
    },
    className: {
      table: {
        disable: true,
      },
    },
    color:{
      control: "text",
    },
    component: {
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
};
