import React, { useCallback, useMemo, useState } from "react";
import { FilterDropdownWrapper, Layout, LayoutContent, TopDivider, VertDivider } from "./styles";
import { Box } from "@mui/material";
import ZigSearch from "../ZigSearch";
import SliderFilterDropdown from "./dropdowns/SliderFilterDropdown";
import SelectFilterDropdown from "./dropdowns/SelectFilterDropdown";
import MultiFilterDropdown from "./dropdowns/MultiFilterDropdown";
import { ZigFilter, ZigFiltersProps } from "./types";
import ZigButton from "components/inputs/ZigButton";
import { useUpdateEffect } from "react-use";
import ZigTypography from "components/display/ZigTypography";

const FilterDropdown = ({ resetFilter, filter, onChange }) => {
  // todo: add checkbox filter
  const Component = filter.type === "slider" ? SliderFilterDropdown : SelectFilterDropdown;
  return (
    <FilterDropdownWrapper>
      <Component resetFilter={resetFilter} filter={filter} onChange={onChange} />
      <VertDivider orientation="vertical" flexItem />
    </FilterDropdownWrapper>
  );
};

const ZigFilters = ({
  defaultFilters,
  initialFilters: filters,
  onChange,
  search,
  onSearchChange,
  label,
  leftComponent,
  rightComponent,
  ...rest
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

  const resetFilter = (id: string) => {
    const updatedFilters = internalFilters.map((filter) => {
      if (filter.id === id) {
        return defaultFilters.find((defaultFilter) => defaultFilter.id === id) as ZigFilter;
      }
      return filter;
    });
    setInternalFilters(updatedFilters);
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
    <Box
      display="flex"
      width={1}
      alignItems="center"
      justifyContent="center"
      flexWrap="wrap"
      gap={1}
      {...rest}
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
          <ZigButton variant="text" onClick={resetFilters}>
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
            position="absolute"
            right={0}
            top={0}
            bottom={0}
          />
        )}
      </Box>
    </Box>
  );
};

export default ZigFilters;
