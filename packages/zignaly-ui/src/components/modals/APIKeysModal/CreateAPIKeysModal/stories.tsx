// Dependencies
import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

// Component
import CreateAPIKeysModal from ".";

export default {
  title: "Modals/API Keys/CreateAPIKeysModal",
  component: CreateAPIKeysModal,
} as ComponentMeta<typeof CreateAPIKeysModal>;

const Template: ComponentStory<typeof CreateAPIKeysModal> = (args) => (
  <CreateAPIKeysModal {...args} />
);

export const Default = Template.bind({});
Default.args = {
  onSubmit: (values) => {
    console.log(values);
  },
};
