// Dependencies
import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

// Component
import ConnectWalletModal from "./";

export default {
  title: "Modals/ConnectWallet",
  component: ConnectWalletModal,
  argTypes: {
    onSubmit: {
      type: "function",
    },
  },
} as ComponentMeta<typeof ConnectWalletModal>;

const Template: ComponentStory<typeof ConnectWalletModal> = (args) => (
  <ConnectWalletModal {...args} />
);

export const Default = Template.bind({});
Default.args = {};
