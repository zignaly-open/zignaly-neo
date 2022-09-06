import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import QRCode from ".";

export default {
  title: "Display/QRCode",
  component: QRCode,
} as ComponentMeta<typeof QRCode>;

const Template: ComponentStory<typeof QRCode> = (args) => <QRCode {...args} />;

export const QRCodeExample = Template.bind({});
QRCodeExample.args = {
  value: "www.zignaly.com",
};
