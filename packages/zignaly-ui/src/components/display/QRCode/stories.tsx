import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import ZignalyQRCode from ".";

export default {
  title: "Display/QRCode",
  component: ZignalyQRCode,
} as ComponentMeta<typeof ZignalyQRCode>;

const Template: ComponentStory<typeof ZignalyQRCode> = (args) => <ZignalyQRCode {...args} />;

export const QRCodeExample = Template.bind({});
QRCodeExample.args = {
  url: "www.zignaly.com",
};
