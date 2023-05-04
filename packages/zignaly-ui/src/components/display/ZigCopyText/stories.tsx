import React from "react";
import "@mui/system";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import ZigCopyText from "./";
import "@mui/system";

const result: ComponentMeta<typeof ZigCopyText> = {
  title: "Display/ZigCopyText",
  component: ZigCopyText,
  argTypes: {
    label: {
      type: "string",
    },
    value: {
      type: "string",
    },
  },
};

export default result;

const Template: ComponentStory<typeof ZigCopyText> = (args) => (
  <ZigCopyText onCopied={() => alert("Copied!")} {...args} />
);

export const CopyText: ComponentMeta<typeof ZigCopyText> = Template.bind({});
CopyText.args = {
  label: "Your deposit address",
  value: "0xjhkjfhvjkhdskjvhdfskjvhsdfkjhvjkh",
};

export const CopySensitiveText: ComponentMeta<typeof ZigCopyText> = Template.bind({});
CopySensitiveText.args = {
  label: "Your deposit address",
  sensitive: true,
  value: "0xjhkjfhvjkhdskjvhdfskjvhsdfkjhvjkh",
};
