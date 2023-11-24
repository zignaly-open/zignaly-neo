import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import ZigFilters from "./index";
import { Box } from "@mui/material";

const meta = {
  title: "Filters/ZigFilters",
  component: ZigFilters,
} as Meta;
export default meta;

const ZigFiltersWrapper = ({ filters: defaultFilters }) => {
  const [filters, setFilters] = useState(defaultFilters);

  const updateFilters = (index, value) => {
    const updatedFilters = [...filters];
    updatedFilters[index] = { ...updatedFilters[index], value };
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
      },
      {
        type: "select",
        value: "all",
        label: "Type",
        options: [
          { value: "all", label: "All" },
          { value: "spot", label: "Spot" },
          { value: "futures", label: "Futures" },
        ],
        id: "type",
      },
    ],
  },
  render: (props) => <ZigFiltersWrapper {...props} />,
};
