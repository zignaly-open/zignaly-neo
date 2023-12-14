import React, { useCallback, useMemo } from "react";
import { FilterDropdownWrapper, Layout, TopDivider, VertDivider } from "./styles";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import ZigSearch from "../ZigSearch";
import SliderFilterDropdown from "./dropdowns/SliderFilterDropdown";
import SelectFilterDropdown from "./dropdowns/SelectFilterDropdown";
import SecondaryFiltersButton from "./dropdowns/SecondaryFiltersButton";
import { ZigFilter, ZigFiltersProps } from "./types";
import ZigButton from "components/inputs/ZigButton";
import ZigTypography from "components/display/ZigTypography";
import CheckboxFilterDropdown from "./dropdowns/CheckboxFilterDropdown";

const FilterDropdown = ({
  resetFilter,
  filter,
  onChange,
  last,
  mobile,
}: {
  resetFilter: () => void;
  onChange: (filter: ZigFilter) => void;
  filter: ZigFilter;
  last: boolean;
  mobile: boolean;
}) => {
  const Component = useMemo(() => {
    if (filter.type === "slider") {
      return SliderFilterDropdown;
    } else if (filter.type === "select") {
      return SelectFilterDropdown;
    } else if (filter.type === "checkbox") {
      return CheckboxFilterDropdown;
    }
    return null;
  }, [filter.type]);

  if (!Component) return null;

  return (
    <FilterDropdownWrapper mobile={mobile}>
      <Component
        mobile={mobile}
        resetFilter={resetFilter}
        filter={filter as never}
        onChange={onChange}
        id={`filters__dropdown-${filter.id}`}
      />
      {!last && <VertDivider orientation="vertical" flexItem />}
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
  prefixId = "filters",
}: ZigFiltersProps) => {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));

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
      <Box
        justifyContent={sm ? "flex-start" : "center"}
        display="flex"
        gap={1}
        alignItems="center"
        flex={1}
        flexGrow={2}
      >
        <Box display="flex" gap={2} alignItems={"center"} justifyContent="center">
          <Layout label={label} mobile={sm}>
            {label && (
              <TopDivider>
                <ZigTypography variant={"h4"} fontWeight={400}>
                  {label}
                </ZigTypography>
              </TopDivider>
            )}
            <Box display={"flex"} alignItems={"center"}>
              {mainFilters.map((filter, i) => (
                <FilterDropdown
                  resetFilter={() => resetFilter(filter.id)}
                  filter={filter}
                  key={filter.id}
                  onChange={updateFilters}
                  last={i === mainFilters.length - 1}
                  mobile={sm}
                />
              ))}
              {!sm && secondaryFilters.length > 0 && (
                <SecondaryFiltersButton
                  resetFilters={resetSecondaryFilters}
                  defaultFilters={defaultFilters}
                  filters={secondaryFilters}
                  onChange={updateFilters}
                  mobile={false}
                />
              )}
            </Box>
          </Layout>
          {!sm && (
            <ZigButton variant="text" onClick={resetFilters} id={`${prefixId}__reset-all`}>
              Reset
            </ZigButton>
          )}
        </Box>
      </Box>
      <Box flex={sm ? 0 : 1} display={"flex"} justifyContent={"flex-end"} position={"relative"}>
        {sm && secondaryFilters.length > 0 && (
          <SecondaryFiltersButton
            resetFilters={resetSecondaryFilters}
            defaultFilters={defaultFilters}
            filters={secondaryFilters}
            onChange={updateFilters}
            mobile={true}
          />
        )}
        {search !== undefined && onSearchChange && !sm && (
          <>
            <Box mr={"46px"}>{rightComponent}</Box>
            <ZigSearch
              value={search}
              onChange={onSearchChange}
              sx={{
                position: "absolute",
                right: 0,
                top: 0,
                bottom: 0,
              }}
              id={`${prefixId}__search`}
            />
          </>
        )}
      </Box>
    </Box>
  );
};

export default ZigFilters;
