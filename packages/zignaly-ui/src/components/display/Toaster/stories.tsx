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

export const ExampleToaster = Template.bind({});
ExampleToaster.args = {
  caption: "Something went wrong",
};
