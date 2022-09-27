import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import MinBalanceModal from "./";

export default {
  title: "Modals/MinBalanceModal",
  component: MinBalanceModal,
} as ComponentMeta<typeof MinBalanceModal>;

const Template: ComponentStory<typeof MinBalanceModal> = (args) => <MinBalanceModal {...args} />;

export const Default = Template.bind({});
Default.args = {
  initialValue: "0",
};
