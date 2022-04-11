// Dependencies
import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

// Component
import TextButton from "./";

// Assets
import CloseIcon from "../../../assets/icons/close-icon.svg";
import ArrowDown from "../../../assets/icons/arrow-bottom-icon.svg";

export default {
  title: "Inputs/TextButton",
  component: TextButton,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/VaAFxJqlZERpeEHw5S5coY/Buttons?node-id=402%3A963",
    },
  },
  argTypes: {
    rightElement: {
      options: { Show: ArrowDown, Hide: null },
      control: { type: "radio" },
    },
    leftElement: {
      options: { Show: CloseIcon, Hide: null },
      control: { type: "radio" },
    },
    caption: {
      control: { type: "text" },
      label: "Change Caption",
    },
    underline: {
      options: [true, false],
      control: { type: "radio" },
    },
    onClick: {
      table: {
        disable: true,
      },
    },
  },
} as ComponentMeta<typeof TextButton>;

const Template: ComponentStory<typeof TextButton> = (args) => <TextButton {...args} />;

/// Normal Buttons
export const NormalTextButton = Template.bind({});
NormalTextButton.args = {
  leftElement: CloseIcon,
};
