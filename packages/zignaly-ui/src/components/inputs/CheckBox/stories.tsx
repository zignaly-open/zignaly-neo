// Dependencies
import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

// Component
import CheckBox from "./";

export default {
  title: "Inputs/CheckBox",
  component: CheckBox,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/VaAFxJqlZERpeEHw5S5coY/Buttons?node-id=402%3A963",
    },
  },
} as ComponentMeta<typeof CheckBox>;

const Template: ComponentStory<typeof CheckBox> = (args) => <CheckBox {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: "Type Something",
  value: true,
  onChange: (isActive: boolean) => {
    console.log("onChnage: ", isActive);
  },
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: "Type Something",
  value: true,
  disabled: true,
  onChange: (isActive: boolean) => {
    console.log("onChnage: ", isActive);
  },
};
