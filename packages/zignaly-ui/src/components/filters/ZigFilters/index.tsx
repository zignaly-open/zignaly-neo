import React, { useMemo } from "react";
import { FilterDropdownWrapper, Layout, TopDivider, VertDivider } from "./styles";
import { Box } from "@mui/material";
import ZigSearch from "../ZigSearch";
import SliderFilterDropdown from "./dropdowns/SliderFilterDropdown";
import SelectFilterDropdown from "./dropdowns/SelectFilterDropdown";
import MultiFilterDropdown from "./dropdowns/MultiFilterDropdown";
import { ZigFilter, ZigFiltersProps } from "./types";
import ZigButton from "components/inputs/ZigButton";
import ZigTypography from "components/display/ZigTypography";

const FilterDropdown = ({
  resetFilter,
  filter,
  onChange,
}: {
  resetFilter: () => void;
  onChange: (filter: ZigFilter) => void;
  filter: ZigFilter;
}) => {
  // todo: add checkbox dropdown
  const Component = filter.type === "slider" ? SliderFilterDropdown : SelectFilterDropdown;
  return (
    <FilterDropdownWrapper>
      <Component
        resetFilter={resetFilter}
        filter={filter}
        onChange={onChange}
        id={`filters__dropdown-${filter.id}`}
      />
      <VertDivider orientation="vertical" flexItem />
    </FilterDropdownWrapper>
  );
};

const ZigFilters = ({
  defaultFilters,
  filters = [],
  onChange,
  search,
  onSearchChange,
  label,
  leftComponent,
  rightComponent,
  sx,
}: ZigFiltersProps) => {
  const [mainFilters, secondaryFilters] = useMemo(() => {
    return [
      filters.filter((filter) => filter.showInBar),
      filters.filter((filter) => !filter.showInBar),
    ];
  }, [filters]);

  const updateFilters = (updatedFilter: ZigFilter) => {
    const updatedFilters = filters.map((filter) => {
      if (filter.id === updatedFilter.id) {
        return updatedFilter;
      }
      return filter;
    });
    onChange(updatedFilters);
  };

  const resetFilters = () => {
    onChange(defaultFilters);
  };

  const resetFilter = (id: string) => {
    const updatedFilters = filters.map((filter) => {
      if (filter.id === id) {
        return defaultFilters.find((defaultFilter) => defaultFilter.id === id) as ZigFilter;
      }
      return filter;
    });
    onChange(updatedFilters);
  };

  const resetSecondaryFilters = () => {
    const updatedFilters = filters.map((filter) => {
      if (!filter.showInBar) {
        return defaultFilters.find((defaultFilter) => defaultFilter.id === filter.id) as ZigFilter;
      }
      return filter;
    });
    onChange(updatedFilters);
  };
  return (
    <Box
      display="flex"
      width={1}
      alignItems="center"
      justifyContent="center"
      flexWrap="wrap"
      gap={1}
      sx={sx}
    >
      <Box display={"flex"} flex={1} flexBasis={{ xs: "100%", md: 0 }}>
        {leftComponent}
      </Box>
      <Box justifyContent="center" display="flex" gap={1} alignItems="center" flex={1} flexGrow={2}>
        <Box display="flex" gap={2} alignItems={"center"} justifyContent="center">
          <Layout label={label}>
            {label && (
              <TopDivider>
                <ZigTypography variant={"h4"} fontWeight={400}>
                  {label}
                </ZigTypography>
              </TopDivider>
            )}
            <Box display={"flex"} alignItems={"center"}>
              {mainFilters.map((filter) => {
                return (
                  <FilterDropdown
                    resetFilter={() => resetFilter(filter.id)}
                    filter={filter}
                    key={filter.id}
                    onChange={updateFilters}
                  />
                );
              })}
              {secondaryFilters.length > 0 && (
                <FilterDropdownWrapper>
                  <MultiFilterDropdown
                    resetFilters={resetSecondaryFilters}
                    filters={secondaryFilters}
                    onChange={updateFilters}
                  />
                </FilterDropdownWrapper>
              )}
            </Box>
          </Layout>
          <ZigButton variant="text" onClick={resetFilters} id={"filters__reset-all"}>
            Reset
          </ZigButton>
        </Box>
      </Box>
      <Box flex={1} display={"flex"} justifyContent={"flex-end"} position={"relative"}>
        <Box mr={"46px"}>{rightComponent}</Box>
        {search !== undefined && onSearchChange && (
          <ZigSearch
            value={search}
            onChange={onSearchChange}
            sx={{
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 0,
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default ZigFilters;
