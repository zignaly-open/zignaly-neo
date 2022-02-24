// Dependencies
import React from 'react';

// Components
import ConnectionStateLabel from './index';
import { connectionStateTypesId } from '@components/display/Table/components/ConnectionStateLabel/types';

// Types

export default {
  title: 'Display/Table/ConnectionStateLabel',
  component: ConnectionStateLabel,
  argTypes: {
    size: {
      control: 'select',
      default: connectionStateTypesId.CONNECTED,
      options: [
        connectionStateTypesId.CONNECTED,
        connectionStateTypesId.DISCONNECTED,
        connectionStateTypesId.SOFT_DISCONNECT,
        connectionStateTypesId.HARD_DISCONNECT,
        connectionStateTypesId.SUSPENDED
      ]
    }
  }
};

const Template = (args) => <ConnectionStateLabel {...args} />;

export const Connected = Template.bind({});
Connected.args = {
  stateId: connectionStateTypesId.CONNECTED
};

export const Disconnected = Template.bind({});
Disconnected.args = {
  stateId: connectionStateTypesId.DISCONNECTED
};

export const SoftDisconnect = Template.bind({});
SoftDisconnect.args = {
  stateId: connectionStateTypesId.SOFT_DISCONNECT
};

export const HardDisconnect = Template.bind({});
HardDisconnect.args = {
  stateId: connectionStateTypesId.HARD_DISCONNECT
};

export const Suspended = Template.bind({});
Suspended.args = {
  stateId: connectionStateTypesId.SUSPENDED
};
