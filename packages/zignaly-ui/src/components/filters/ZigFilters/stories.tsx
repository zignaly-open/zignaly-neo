import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import ZigFilters from "./index";
import { Box } from "@mui/material";
import { ZigFiltersType } from "./types";

const ZigFiltersWrapper = ({ filters }: { filters: ZigFiltersType }) => {
  const [currentFilters, setCurrentFilters] = useState(filters);
  return (
    <Box display="flex" width={1}>
      <ZigFilters defaultFilters={filters} filters={currentFilters} onChange={setCurrentFilters} />
    </Box>
  );
};
type ZigFiltersProps = React.ComponentProps<typeof ZigFilters>;
type Story = StoryObj<ZigFiltersProps>;
const meta: Meta<ZigFiltersProps> = {
  title: "Filters/ZigFilters",
  component: ZigFilters,
  render: (props) => <ZigFiltersWrapper {...props} />,
};
export default meta;

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
        primary: true,
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
        primary: true,
      },
      {
        type: "checkbox",
        label: "Type",
        options: [
          { value: "spot", label: "Spot" },
          { value: "futures", label: "Futures" },
        ],
        id: "type",
        value: ["spot", "futures"],
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
};
