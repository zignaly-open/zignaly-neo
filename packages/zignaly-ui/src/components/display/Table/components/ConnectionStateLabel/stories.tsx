// Dependencies
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

// Components
import ConnectionStateLabel, { ConnectionStateLabelId } from "./index";

// Types

export default {
  title: "Display/Table/Components/ConnectionStateLabel",
  component: ConnectionStateLabel,
  argTypes: {
    size: {
      control: "select",
      default: ConnectionStateLabelId.CONNECTED,
      options: [
        ConnectionStateLabelId.CONNECTED,
        ConnectionStateLabelId.DISCONNECTED,
        ConnectionStateLabelId.SOFT_DISCONNECT,
        ConnectionStateLabelId.HARD_DISCONNECT,
        ConnectionStateLabelId.SUSPENDED,
      ],
    },
  },
} as ComponentMeta<typeof ConnectionStateLabel>;

const Template: ComponentStory<typeof ConnectionStateLabel> = (args) => (
  <ConnectionStateLabel {...args} />
);

export const Connected = Template.bind({});
Connected.args = {
  stateId: ConnectionStateLabelId.CONNECTED,
};

export const Disconnected = Template.bind({});
Disconnected.args = {
  stateId: ConnectionStateLabelId.DISCONNECTED,
};

export const SoftDisconnect = Template.bind({});
SoftDisconnect.args = {
  stateId: ConnectionStateLabelId.SOFT_DISCONNECT,
};

export const HardDisconnect = Template.bind({});
HardDisconnect.args = {
  stateId: ConnectionStateLabelId.HARD_DISCONNECT,
};

export const Suspended = Template.bind({});
Suspended.args = {
  stateId: ConnectionStateLabelId.SUSPENDED,
};
