// Dependencies
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

// Assets
import EditPenIcon from "@assets/icons/edit-pen-icon.svg";

// Component
import TableButton from "./index";

export default {
  title: "Display/Table/Components/TableButton",
  component: TableButton,
} as ComponentMeta<typeof TableButton>;

const Template: ComponentStory<typeof TableButton> = (args) => <TableButton {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  icon: EditPenIcon,
  caption: "Edit",
};
