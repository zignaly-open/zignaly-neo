// Dependencies
import React from 'react';

// Components
import DateLabel from './index';

export default {
  title: 'Display/Table/Components/DateLabel',
  component: DateLabel,
  argTypes: {
    date: {
      control: 'date',
      default: new Date()
    }
  }
};

const Template = (args) => <DateLabel {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  date: new Date()
};
