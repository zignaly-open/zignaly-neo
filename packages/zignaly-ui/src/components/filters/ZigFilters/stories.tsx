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

const ZigFiltersWrapper = ({ filters: defaultFilters }: { filters: ZigFiltersType }) => {
  const [filters, setFilters] = useState(defaultFilters);

  // todo: add to util?
  const updateFilters = (id, value) => {
    const updatedFilters = [...filters];
    // fix and adapt to type
    updatedFilters.find((filter) => filter.id === id).value = value;
    // updatedFilters[index] = { ...updatedFilters[index], value };
    setFilters(updatedFilters);
    console.log(updatedFilters);
  };

  return (
    <Box display="flex">
      <ZigFilters defaultFilters={defaultFilters} filters={filters} onChange={updateFilters} />
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
