// Dependencies
import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

// Component
import LoginModal from "./";

export default {
  title: "Modals/LoginModal",
  component: LoginModal,
  argTypes: {
    onSubmit: {
      type: "function",
    },
  },
} as ComponentMeta<typeof LoginModal>;

const Template: ComponentStory<typeof LoginModal> = (args) => <LoginModal {...args} />;

export const Default = Template.bind({});
Default.args = {};
