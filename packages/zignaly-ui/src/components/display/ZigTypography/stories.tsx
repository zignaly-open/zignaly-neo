import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Variant } from "@mui/material/styles/createTypography";
import ZigTypography from "./index";

export default {
  title: "Display/ZigTypography",
  component: ZigTypography,
  argTypes: {
    text: {
      control: "text",
      defaultValue: "Hello",
    },
    variant: {
      options: ["body1", "body2", "bigNumber", "h1", "h2", "h3", "h4", "caption"],
      control: { type: "select" },
      defaultValue: "body1",
    },
  },
  parameters: {
    jest: ["typography"],
  },
} as ComponentMeta<typeof ZigTypography>;

const Template: ComponentStory<React.FC<{ text: string; variant: string }>> = ({
  variant,
  text,
}) => (
  <ZigTypography component={"p"} variant={variant as Variant}>
    {text}
  </ZigTypography>
);

const ShowcaseTemplate: ComponentStory<React.FC<{ text: string }>> = ({ text }) => (
  <>
    <ZigTypography variant={"bigNumber"}>bigNumber: {text}</ZigTypography>
    <ZigTypography variant={"h1"}>h1: {text}</ZigTypography>
    <ZigTypography variant={"h2"}>h2: {text}</ZigTypography>
    <ZigTypography variant={"h3"}>h3: {text}</ZigTypography>
    <ZigTypography variant={"h4"}>h4: {text}</ZigTypography>
    <ZigTypography variant={"body1"} component={"p"}>
      body1: {text}
    </ZigTypography>
    <ZigTypography variant={"body2"} component={"p"}>
      body2: {text}
    </ZigTypography>
    <ZigTypography variant={"caption"}>caption: {text}</ZigTypography>
  </>
);

export const Basic = Template.bind({});
Basic.args = {
  text: "Example text",
};

export const Showcase = ShowcaseTemplate.bind({});
Showcase.args = {
  text: "Example text",
};
