// Dependencies
import React from 'react';

// Assets
import OptionDotsIcon from '@assets/icons/option-dots-icon.svg';

// Component
import IconButton from './';

export default {
  title: 'Inputs/IconButton',
  component: IconButton
};

const Template = (args) => (
  <IconButton {...args} />
);

export const Basic = Template.bind({});
Basic.args = {
  icon: OptionDotsIcon
};
