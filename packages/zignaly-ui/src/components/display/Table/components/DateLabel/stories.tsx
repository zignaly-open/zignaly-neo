// Dependencies
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

// Components
import DateLabel from "./index";

export default {
  title: "Display/Table/Components/DateLabel",
  component: DateLabel,
  argTypes: {
    date: {
      control: "date",
      default: new Date(),
    },
  },
} as ComponentMeta<typeof DateLabel>;

const Template: ComponentStory<typeof DateLabel> = (args) => <DateLabel {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  date: new Date("December 1, 1997 20:10:00"),
};
