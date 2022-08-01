// Dependencies
import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

// Component
import EmailVerifyForm from "./";

export default {
  title: "Forms/EmailVerifyForm",
  component: EmailVerifyForm,
} as ComponentMeta<typeof EmailVerifyForm>;

const Template: ComponentStory<typeof EmailVerifyForm> = (args) => <EmailVerifyForm {...args} />;

export const Default = Template.bind({});
Default.args = {
  isLoading: false,
  onSubmit: (values: any) => {
    console.log(values);
  },
  onReSendCode: () => {
    console.log("onReSendCode()");
  },
};
