// Dependencies
import React from 'react';

// Components
import PercentageIndicator from './index';

export default {
  title: 'Display/Table/Components/PercentageIndicator',
  component: PercentageIndicator,
  argTypes: {
    size: {
      control: 'number',
      default: 50
    }
  }
};

const Template = (args) => <PercentageIndicator {...args} />;

export const Positive = Template.bind({});
Positive.args = {
  value: 50
};

export const Negative = Template.bind({});
Negative.args = {
  value: -50
};
