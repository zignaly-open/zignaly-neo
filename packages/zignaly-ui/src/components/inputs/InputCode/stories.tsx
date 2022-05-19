// Dependencies
import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

// Component
import InputCode from "./";

export default {
  title: "Inputs/InputCode",
  component: InputCode,
  argTypes: {
    fields: {
      type: "number",
    },
    onComplete: {
      type: "function",
    },
    loading: {
      type: "boolean",
      defaultValue: false,
    },
  },
} as ComponentMeta<typeof InputCode>;

const Template: ComponentStory<typeof InputCode> = (args) => <InputCode {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  fields: 6,
  loading: false,
  onComplete: () => {},
};
