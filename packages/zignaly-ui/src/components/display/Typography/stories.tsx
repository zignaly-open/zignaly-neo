import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Typography from "./";
import { dark } from "../../../theme";
import { weightByType } from "./types";

export default {
  title: "Display/Typography",
  component: Typography,
  argTypes: {
    variant: {
      control: "select",
      options: [
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "bigNumber",
        "body1",
        "body2",
        "buttonxl",
        "buttonl",
        "buttonm",
        "buttonsm",
        "inputl",
        "inputm",
      ],
    },
    weight: {
      control: "select",
      options: Object.keys(weightByType),
    },
    color: {
      options: Object.keys(dark),
      control: "select",
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
