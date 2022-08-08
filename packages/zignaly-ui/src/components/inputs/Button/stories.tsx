// Dependencies
import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

// Component
import Button from "./";

// Assets
import { ReactComponent as CloseIcon } from "assets/icons/close-icon.svg";
import { ReactComponent as ArrowDown } from "assets/icons/arrow-bottom-icon.svg";

const ICONS = {
  ArrowDown: <ArrowDown color={"#E1E9F0"} />,
  CloseIcon: <CloseIcon color={"#E1E9F0"} />,
  NoIcon: null,
};
type Icons = typeof ICONS;

const renderIcon = (icon: keyof Icons) => {
  const Icon = ICONS[icon];
  return Icon ? Icon : null;
};

export default {
  title: "Inputs/Button",
  component: Button,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/VaAFxJqlZERpeEHw5S5coY/Buttons?node-id=402%3A963",
    },
  },
  argTypes: {
    size: {
      options: ["small", "medium", "large", "xlarge"],
      control: { type: "select" },
    },
    variant: {
      options: ["primary", "secondary"],
      control: { type: "select" },
    },
    color: {
      options: ["grey", "green"],
      control: { type: "select" },
    },
    rightElement: {
      control: {
        type: "select",
      },
      options: Object.keys(ICONS),
    },
    disabled: {
      options: [true, false],
      control: { type: "radio" },
    },
    loading: {
      options: [true, false],
      control: { type: "radio" },
    },
    leftElement: {
      control: {
        type: "select",
      },
      options: Object.keys(ICONS),
    },
    caption: {
      control: { type: "text" },
      label: "Change Caption",
    },
    onClick: {
      table: {
        disable: true,
      },
    },
    minWidth: {
      control: { type: "number" },
      lable: "Change min width",
    },
    maxWidth: {
      control: { type: "number" },
      lable: "Change max width",
    },
    maxHeight: {
      control: { type: "number" },
      lable: "Change max height",
    },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = ({ leftElement, rightElement, ...args }) => {
  return (
    <Button
      leftElement={renderIcon(leftElement as keyof Icons)}
      rightElement={renderIcon(rightElement as keyof Icons)}
      {...args}
    />
  );
};

export const NormalButton = Template.bind({});
NormalButton.args = {
  variant: "primary",
  size: "medium",
};
