// Dependencies
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

// Assets
import OptionDotsIcon from "assets/icons/option-dots-icon.svg?url";

// Component
import IconButton from "./";

export default {
  title: "Inputs/IconButton",
  component: IconButton,
} as ComponentMeta<typeof IconButton>;

const Template: ComponentStory<typeof IconButton> = (args) => <IconButton {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  icon: OptionDotsIcon,
};
