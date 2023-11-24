import React from "react";
import { Layout } from "./styles";
import { ZigFiltersType } from "./types";
import ZigDropdown from "components/display/ZigDropdown";
import { Box } from "@mui/material";
import ZigTypography from "components/display/ZigTypography";
import { ChevronRight, ExpandLess } from "@mui/icons-material";
import ZigSearch from "../ZigSearch";
import SliderFilter from "./filters/SliderFilter";
import FilterItem from "./dropdowns/SliderFilterDropdown";
import SliderFilterItem from "./dropdowns/SliderFilterDropdown";
import SelectFilterItem from "./dropdowns/SelectFilterDropdown";

const ZigFilters = ({
  defaultFilters,
  filters,
  onChange,
}: {
  defaultFilters: ZigFiltersType;
  filters: ZigFiltersType;
}) => {
  return (
    <Box display="flex" width={1}>
      <Box display="flex" gap={2} alignItems={"center"}>
        <Layout>
          {filters.map((filter, index) => {
            const FilterComponent = filter.type === "slider" ? SliderFilterItem : SelectFilterItem;
            return (
              <FilterComponent filter={filter} key={index} onChange={(v) => onChange(index, v)} />
            );
          })}
        </Layout>
        <ZigTypography>Reset</ZigTypography>
      </Box>
      <ZigSearch />
    </Box>
  );
};

export default ZigFilters;
