import React, { useState } from "react";
import "@mui/system";
import { Meta, StoryObj } from "@storybook/react";
import ZigSearch from "./index";
import { ZigSearchProps } from "./types";
import { Box } from "@mui/material";

const meta = {
  title: "Filters/ZigSearch",
  component: ZigSearch,
} as Meta;
export default meta;

const ZigSearchWrapper = () => {
  const [value, setValue] = useState("");
  return (
    <Box display="flex" justifyContent={"flex-end"} mr={5}>
      <ZigSearch value={value} onChange={setValue} />
    </Box>
  );
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: (props) => <ZigSearchWrapper {...props} />,
};
