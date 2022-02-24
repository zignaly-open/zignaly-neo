// Dependencies
import React from 'react';

// Component
import ZigWalletIndicator from './';

// Types
import { rankTypesId } from '@types/ranks';

export default {
  title: 'Display/ZigWalletIndicator',
  component: ZigWalletIndicator,
  argTypes: {
    zigs: {
      control: 'text'
    },
    rankId: {
      control: 'select',
      default: rankTypesId.WHALE,
      options: [
        rankTypesId.WHALE,
        rankTypesId.DOLPHIN
      ]
    }
  },
  parameters: {
    jest: ['test.js']
  }
};

const Template = (args) => (
  <ZigWalletIndicator {...args}>
    {args.text}
  </ZigWalletIndicator>
);

export const Dolphin = Template.bind({});
Dolphin.args = {};
