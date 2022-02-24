// Dependencies
import React from 'react';

// Assets
import EditPenIcon from '@assets/icons/edit-pen-icon.svg';

// Component
import TableButton from './index';

export default {
  title: 'Display/Table/Components/TableButton',
  component: TableButton
};

const Template = (args) => (
  <TableButton {...args} />
);

export const Basic = Template.bind({});
Basic.args = {
  icon: EditPenIcon,
  caption: 'Edit'
};
