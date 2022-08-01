// Dependencies
import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

// Component
import EditAPIKeysModal from ".";

export default {
  title: "Modals/API Keys/EditAPIKeysModal",
  component: EditAPIKeysModal,
} as ComponentMeta<typeof EditAPIKeysModal>;

const Template: ComponentStory<typeof EditAPIKeysModal> = (args) => <EditAPIKeysModal {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: "API 1",
  apikey: "4kj4iddd9sadddd000a0a0a0",
  settings: {
    spot: false,
    margin: true,
    futures: false,
    whitelistIps: "172.11.08.1 172.11.08.2",
  },
  onSubmit: (values) => {
    console.log(values);
  },
};
