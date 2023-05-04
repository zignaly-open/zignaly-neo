import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Toaster from "./";
import { Box } from "@mui/system";

export default {
  title: "Display/Toaster",
  component: Toaster,
  argTypes: {
    variant: {
      options: ["success", "error", "info"],
      control: { type: "select" },
    },
    size: {
      options: ["large", "small"],
      control: { type: "select" },
    },
    caption: {
      control: "text",
    },
  },
  parameters: {
    jest: ["test.tsx"],
  },
} as ComponentMeta<typeof Toaster>;

const Template: ComponentStory<typeof Toaster> = (args) => (
  <Box sx={{ minHeight: 70 }}>
    <Toaster {...args} />
  </Box>
);

export const Success = Template.bind({});
Success.args = {
  caption: "Something went right",
  variant: "success",
};

export const Error = Template.bind({});
Error.args = {
  caption: "Something went wrong",
  variant: "error",
};

export const Info = Template.bind({});
Info.args = {
  caption: "Something went",
  variant: "info",
};
