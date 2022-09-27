import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import AuthVerifyModal from "./";

export default {
  title: "Modals/AuthVerifyModal",
  component: AuthVerifyModal,
  argTypes: {
    hasAsk2FA: {
      type: "boolean",
      defaultValue: false,
    },
    hasEmailVerified: {
      type: "boolean",
      defaultValue: false,
    },
    isLoadingEmailVerifyInput: {
      type: "boolean",
      defaultValue: false,
    },
    isLoadingTwoFAVerifyInput: {
      type: "boolean",
      defaultValue: false,
    },
    isDisabled: {
      type: "boolean",
      defaultValue: false,
    },
    ask2FA: {
      type: "boolean",
      defaultValue: true,
    },
    isUnknownDevice: {
      type: "boolean",
      defaultValue: true,
    },
  },
} as ComponentMeta<typeof AuthVerifyModal>;

const Template: ComponentStory<typeof AuthVerifyModal> = (args) => <AuthVerifyModal {...args} />;

export const Default = Template.bind({});
Default.args = {};
