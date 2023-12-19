import React, { useMemo } from "react";
import { Layout, TopDivider } from "./styles";
import { Box, IconButton, useMediaQuery, useTheme } from "@mui/material";
import ZigSearch from "../ZigSearch";
import MultiFiltersButton from "./dropdowns/MultiFiltersButton";
import { ZigFilter, ZigFiltersProps } from "./types";
import ZigButton from "components/inputs/ZigButton";
import ZigTypography from "components/display/ZigTypography";
import FilterDropdown from "./dropdowns/FilterDropdown";
import { ZigResetIcon } from "icons";
import { isEqual } from "lodash-es";

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
  const xs = useMediaQuery(theme.breakpoints.down("sm"));

  const [mainFilters, secondaryFilters] = useMemo(() => {
    return [
      filters.filter((filter) => filter.showInBar),
      filters.filter((filter) => !filter.showInBar),
    ];
  }, [filters]);

  const updateFilter = (updatedFilter: ZigFilter) => {
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
  const showMultiFilters = !xs && secondaryFilters.length > 0;

  const filtersChangedCount = useMemo(() => {
    return filters.filter((filter) => {
      const defaultFilter = defaultFilters?.find((defaultFilter) => defaultFilter.id === filter.id);
      return !isEqual(filter.value, defaultFilter?.value);
    }).length;
  }, [filters, defaultFilters]);

  return (
    <Box
      display="flex"
      width={1}
      alignItems="center"
      justifyContent="center"
      flexWrap="wrap"
      gap={1}
      sx={sx}
      mx={{ sm: 1, md: 0 }}
    >
      <Box display={"flex"} flex={1} flexBasis={{ xs: "100%", md: 0 }}>
        {leftComponent}
      </Box>
      <Box
        justifyContent={{ sm: "flex-start", md: "center" }}
        display="flex"
        gap={1}
        alignItems="center"
        flex={1}
        flexGrow={5}
      >
        <Box display="flex" gap={{ xs: 1, sm: 2 }} alignItems={"center"} justifyContent="center">
          <Layout label={label} mobile={xs}>
            {label && (
              <TopDivider>
                <ZigTypography variant={"h4"} fontWeight={400}>
                  {label}
                </ZigTypography>
              </TopDivider>
            )}
            <Box display={"flex"} alignItems={"center"} {...(xs && { gap: 1, flexWrap: "wrap" })}>
              {mainFilters.map((filter, i) => (
                <FilterDropdown
                  resetFilter={() => resetFilter(filter.id)}
                  filter={filter}
                  key={filter.id}
                  onChange={updateFilter}
                  separator={!xs && (showMultiFilters || i < mainFilters.length - 1)}
                  mobile={xs}
                  prefixId={prefixId}
                />
              ))}
              {showMultiFilters && (
                <MultiFiltersButton
                  resetFilters={resetSecondaryFilters}
                  defaultFilters={defaultFilters}
                  filters={secondaryFilters}
                  onChange={updateFilter}
                  mobile={false}
                  prefixId={prefixId}
                />
              )}
            </Box>
          </Layout>
          {xs ? (
            filtersChangedCount > 0 && (
              <IconButton onClick={resetFilters} sx={{ color: "links" }}>
                <ZigResetIcon />
              </IconButton>
            )
          ) : (
            <ZigButton variant="text" onClick={resetFilters} id={`${prefixId}__reset-all`}>
              Reset
            </ZigButton>
          )}
        </Box>
      </Box>
      <Box flex={xs ? 0 : 1} display={"flex"} justifyContent={"flex-end"} position={"relative"}>
        {xs && secondaryFilters.length > 0 && (
          <MultiFiltersButton
            resetFilters={resetSecondaryFilters}
            defaultFilters={defaultFilters}
            filters={secondaryFilters}
            onChange={updateFilter}
            mobile={true}
            prefixId={prefixId}
          />
        )}
        {search !== undefined && onSearchChange && !xs && (
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
