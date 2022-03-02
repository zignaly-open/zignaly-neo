import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Typography from "./";

export default {
  title: "Display/Typography",
  component: Typography,
  argTypes: {
    variant: {
      control: "select",
      options: ["h1", "h2", "h3", "h4", "h5", "h6", "body1"],
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

export const H1 = Template.bind({});
H1.args = {
  children: "Example Title",
  variant: "h1",
};

export const H2 = Template.bind({});
H2.args = {
  children: "Example Title",
  variant: "h2",
};

export const H3 = Template.bind({});
H3.args = {
  children: "Example Title",
  variant: "h3",
};

export const H4 = Template.bind({});
H4.args = {
  children: "Example Title",
  variant: "h4",
};

export const H5 = Template.bind({});
H5.args = {
  children: "Example Title",
  variant: "h5",
};

export const H6 = Template.bind({});
H6.args = {
  children: "Example Title",
  variant: "h6",
};

export const body = Template.bind({});
body.args = {
  children: "Example body text",
  variant: "body",
};

export const number = Template.bind({});
number.args = {
  children: 10000000,
  // @ts-ignore todo: no body2
  variant: "body2",
  style: "number",
};
