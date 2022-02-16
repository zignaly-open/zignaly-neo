import React from 'react';

import ZigWalletIndicator from './';

export default {
  title: 'Display/ZigWalletIndicator',
  component: ZigWalletIndicator,
  argTypes: {
    zigs: {
      control: 'text'
    }
  },
  parameters: {
    jest: ['index.test.js']
  }
};

const Template = (args) => (
  <ZigWalletIndicator {...args}>
    {args.text}
  </ZigWalletIndicator>
);

export const Default = Template.bind({});
Default.args = {};
