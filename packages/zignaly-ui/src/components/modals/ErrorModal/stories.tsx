// Dependencies
import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

// Component
import ErrorModal from "./";

export default {
  title: "Modals/ErrorModal",
  component: ErrorModal,
} as ComponentMeta<typeof ErrorModal>;

const Template: ComponentStory<typeof ErrorModal> = (args) => <ErrorModal {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: "An error has occurred",
  description: "Could not connect to the server, please try again later.",
};
