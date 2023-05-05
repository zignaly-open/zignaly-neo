import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import ZigQrCode from ".";

export default {
  title: "Display/ZigQrCode",
  component: ZigQrCode,
} as ComponentMeta<typeof ZigQrCode>;

const Template: ComponentStory<typeof ZigQrCode> = (args) => <ZigQrCode {...args} />;

export const QRCodeExample = Template.bind({});
QRCodeExample.args = {
  url: "www.zignaly.com",
};
