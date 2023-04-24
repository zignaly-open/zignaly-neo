import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Typography } from "@mui/material";
import { Variant } from "@mui/material/styles/createTypography";

export default {
  title: "Display/ZigTypography",
  component: Typography,
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
} as ComponentMeta<typeof Typography>;

const Template: ComponentStory<React.FC<{ text: string; variant: string }>> = ({
  variant,
  text,
}) => (
  <Typography component={"p"} variant={variant as Variant}>
    {text}
  </Typography>
);

export const Basic = Template.bind({});
Basic.args = {
  text: "Example text",
};
