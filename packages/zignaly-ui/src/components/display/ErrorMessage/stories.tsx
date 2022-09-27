import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import ErrorMessage from "./";

export default {
  title: "Display/ErrorMessage",
  component: ErrorMessage,
} as ComponentMeta<typeof ErrorMessage>;

const Template: ComponentStory<typeof ErrorMessage> = (args) => <ErrorMessage {...args} />;

export const Error = Template.bind({});
Error.args = {
  text: "Exceeds available balance",
};
