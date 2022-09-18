import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import MessageModal from "./";

export default {
  title: "Modals/MessageModal",
  component: MessageModal,
} as ComponentMeta<typeof MessageModal>;

const Template: ComponentStory<typeof MessageModal> = (args) => <MessageModal {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: "An error has occurred",
  description: "Could not connect to the server, please try again later.",
};
