import React, { useCallback, useMemo } from "react";
import { Layout } from "./styles";
import { Box } from "@mui/material";
import ZigTypography from "components/display/ZigTypography";
import ZigSearch from "../ZigSearch";
import SliderFilterDropdown from "./dropdowns/SliderFilterDropdown";
import SelectFilterDropdown from "./dropdowns/SelectFilterDropdown";
import MultiFilterDropdown from "./dropdowns/MultiFilterDropdown";
import { ZigFiltersProps } from "./types";
import ZigButton from "components/inputs/ZigButton";

const ZigFilters = ({ defaultFilters, filters, onChange }: ZigFiltersProps) => {
  const [mainFilters, secondaryFilters] = useMemo(() => {
    return [
      filters.filter((filter) => filter.showInBar),
      filters.filter((filter) => !filter.showInBar),
    ];
  }, [filters]);

  return (
    <Box display="flex" width={1}>
      <Box display="flex" gap={2} alignItems={"center"}>
        <Layout>
          {mainFilters.map((filter) => {
            // todo: add checkbox
            const FilterDropdown =
              filter.type === "slider" ? SliderFilterDropdown : SelectFilterDropdown;
            return (
              <FilterDropdown
                filter={filter}
                key={filter.id}
                onChange={(v) => onChange(filter.id, v)}
              />
            );
          })}
          <MultiFilterDropdown filters={secondaryFilters} />
        </Layout>
        <ZigButton variant="text" onClick={() => onChange(defaultFilters)}>
          Reset
        </ZigButton>
      </Box>
      <ZigSearch />
    </Box>
  );
};

export default ZigFilters;
