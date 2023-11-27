import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import ZigFilters from "./index";
import { Box } from "@mui/material";
import { ZigFiltersType } from "./types";

const meta = {
  title: "Filters/ZigFilters",
  component: ZigFilters,
} as Meta;
export default meta;

const ZigFiltersWrapper = ({ filters }: { filters: ZigFiltersType }) => {
  return (
    <Box display="flex">
      <ZigFilters defaultFilters={filters} filters={filters} onChange={() => {}} />
    </Box>
  );
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    filters: [
      {
        type: "slider",
        value: [19, 100],
        label: "6 months returns",
        allowNoMin: true,
        allowNoMax: true,
        min: 0,
        max: 100,
        id: "returns",
        showInBar: true,
      },
      {
        type: "select",
        value: "all",
        label: "Coin",
        options: [
          { value: "all", label: "All" },
          { value: "USDT", label: "USDT" },
          { value: "USDC", label: "USDC" },
        ],
        id: "coin",
        showInBar: true,
      },
      {
        type: "checkbox",
        label: "Type",
        options: [
          { value: "spot", label: "Spot", checked: true },
          { value: "futures", label: "Futures", checked: true },
        ],
        id: "type",
      },
      {
        type: "slider",
        value: [0, 50],
        label: "Service Fee",
        min: 0,
        max: 50,
        id: "fee",
      },
    ],
  },
  render: (props) => <ZigFiltersWrapper {...props} />,
};
