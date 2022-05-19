// Dependencies
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

// Component
import MenuDropDown from "./";

export default {
  title: "Navigation/MenuDropDown",
  component: MenuDropDown,
  argTypes: {
    title: {
      control: "text",
      defaultValue: "Title",
    },
    secondaryTitle: {
      control: "text",
      defaultValue: null,
    },
    focused: {
      control: "boolean",
      defaultValue: false,
    },
  },
} as ComponentMeta<typeof MenuDropDown>;

const Template: ComponentStory<typeof MenuDropDown> = (args) => (
  <MenuDropDown {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: 'Barry Scalping Orange Long Orange Orange',
  secondaryTitle: 'Manage Service'
};
