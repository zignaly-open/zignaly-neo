import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Toaster from "./";

export default {
  title: "Display/Toaster",
  component: Toaster,
  argTypes: {
    variant: {
      options: ["success", "error"],
      control: { type: "select" },
    },
    size: {
      options: ["large", "small"],
      control: { type: "select" },
    },
    caption: {
      control: "text",
    },
  },
  parameters: {
    jest: ["test.tsx"],
  },
} as ComponentMeta<typeof Toaster>;

const Template: ComponentStory<typeof Toaster> = (args) => <Toaster {...args} />;

export const Success = Template.bind({});
Success.args = {
  caption: "Something went right",
  variant: "success",
};

export const Error = Template.bind({});
Error.args = {
  caption: "Something went wrong",
  variant: "error",
};
