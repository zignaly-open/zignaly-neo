import React, { useMemo, useState } from "react";
import { Layout } from "./styles";
import { Box } from "@mui/material";
import ZigSearch from "../ZigSearch";
import SliderFilterDropdown from "./dropdowns/SliderFilterDropdown";
import SelectFilterDropdown from "./dropdowns/SelectFilterDropdown";
import MultiFilterDropdown from "./dropdowns/MultiFilterDropdown";
import { ZigFilter, ZigFiltersProps } from "./types";
import ZigButton from "components/inputs/ZigButton";
import { useUpdateEffect } from "react-use";

const ZigFilters = ({
  defaultFilters,
  initialFilters: filters,
  onChange,
  search,
  onSearchChange,
  title,
}: ZigFiltersProps) => {
  const [internalFilters, setInternalFilters] = useState(filters ?? defaultFilters);

  const [mainFilters, secondaryFilters] = useMemo(() => {
    return [
      internalFilters.filter((filter) => filter.showInBar),
      internalFilters.filter((filter) => !filter.showInBar),
    ];
  }, [internalFilters]);

  useUpdateEffect(() => {
    onChange(internalFilters);
  }, [internalFilters]);

  const updateFilters = (updatedFilter: ZigFilter) => {
    const updatedFilters = internalFilters.map((filter) => {
      if (filter.id === updatedFilter.id) {
        return updatedFilter;
      }
      return filter;
    });
    setInternalFilters(updatedFilters);
  };

  const resetFilters = () => {
    setInternalFilters(defaultFilters);
  };

  const resetSecondaryFilters = () => {
    const updatedFilters = internalFilters.map((filter) => {
      if (!filter.showInBar) {
        return defaultFilters.find((defaultFilter) => defaultFilter.id === filter.id) as ZigFilter;
      }
      return filter;
    });
    setInternalFilters(updatedFilters);
  };

  return (
    <Box display="flex" width={1}>
      <Box display="flex" gap={2} alignItems={"center"}>
        {/* {title && <Box flexGrow={1}>
                <ZigTypography variant='h4' fontWeight={400}>
          {title}
        </ZigTypography>
        </Box>} */}
        <Layout>
          {mainFilters.map((filter) => {
            // todo: add checkbox
            const FilterDropdown =
              filter.type === "slider" ? SliderFilterDropdown : SelectFilterDropdown;
            return <FilterDropdown filter={filter} key={filter.id} onChange={updateFilters} />;
          })}
          {secondaryFilters.length > 0 && (
            <MultiFilterDropdown
              resetFilters={resetSecondaryFilters}
              filters={secondaryFilters}
              onChange={updateFilters}
            />
          )}
        </Layout>
        <ZigButton variant="text" onClick={resetFilters}>
          Reset
        </ZigButton>
      </Box>
      {search !== undefined && onSearchChange && (
        <ZigSearch value={search} onChange={onSearchChange} />
      )}
    </Box>
  );
};

export default ZigFilters;
