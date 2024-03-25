import React, { useMemo, useRef } from "react";
import { Layout, TopDivider } from "./styles";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import ZigSearch from "../ZigSearch";
import MultiFiltersButton from "./dropdowns/MultiFiltersButton";
import { ZigFilter, ZigFiltersProps } from "./types";
import ZigButton from "components/inputs/ZigButton";
import ZigTypography from "components/display/ZigTypography";
import FilterDropdown from "./dropdowns/FilterDropdown";
import useDetectWrapping from "hooks/useDetectWrapping";
import { useTranslation } from "react-i18next";

const GAP = 1;

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
  const md = useMediaQuery(theme.breakpoints.up("md"));
  const lg = useMediaQuery(theme.breakpoints.up("lg"));
  const { t } = useTranslation("zignaly-ui", { keyPrefix: "ZigFilters" });

  const [mobileFilters, mainFilters, secondaryFilters] = useMemo(() => {
    return [
      filters.filter((filter) => filter.mobile),
      filters.filter((filter) => (filter.mobile === "md" ? md && !lg : filter.primary)),
      filters.filter((filter) => !filter.mobile && (!filter.primary || !md)),
    ];
  }, [filters, md, lg]);

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
      if (secondaryFilters.find((secondaryFilter) => secondaryFilter.id === filter.id)) {
        return defaultFilters.find((defaultFilter) => defaultFilter.id === filter.id) as ZigFilter;
      }
      return filter;
    });
    onChange(updatedFilters);
  };
  const inlineMultiFilters = md && secondaryFilters.length > 0;

  const containerRef = useRef<HTMLElement>(null);
  const rightRef = useRef<HTMLElement>(null);
  // Hook to wrap middle item if right item is wrapped, and to apply a space-between alignment
  const isWrapped = useDetectWrapping(containerRef) && md;

  return (
    <Box
      display="flex"
      flex={1}
      alignItems="center"
      justifyContent="center"
      flexWrap="wrap"
      gap={GAP}
      mb={{ xs: 2, sm: 3.5 }}
      mx={{ sm: 1, md: 0 }}
      sx={sx}
      ref={containerRef}
    >
      <Box
        display={"flex"}
        flex={1}
        justifyContent={"flex-start"}
        flexBasis={!md && mobileFilters.length ? "100%" : 0}
        borderRight={
          // Hack to wrap middle item if right item is wrapped
          isWrapped
            ? `${(rightRef.current?.offsetWidth ?? 0) + GAP * 8 * 2}px solid transparent`
            : "none"
        }
      >
        {leftComponent}
      </Box>
      {!md && (
        <Box display={"flex"} flex={1} justifyContent={"flex-start"}>
          {mobileFilters.map((filter, i) => (
            <FilterDropdown
              resetFilter={() => resetFilter(filter.id)}
              filter={filter}
              key={filter.id}
              onChange={updateFilter}
              separator={i < mobileFilters.length - 1}
              mobile={!md}
              prefixId={prefixId}
            />
          ))}
        </Box>
      )}
      <Box
        justifyContent={
          isWrapped
            ? "flex-start"
            : {
                sm: "flex-start",
                md: "center",
              }
        }
        display="flex"
        gap={1}
        alignItems="center"
        flex={1}
        flexGrow={!md ? 0 : 5}
      >
        <Box display="flex" gap={{ xs: 1, sm: 2 }} alignItems={"center"} justifyContent="center">
          <Layout label={label} mobile={!md}>
            {label && (
              <TopDivider>
                <ZigTypography variant={"h4"} fontWeight={400}>
                  {label}
                </ZigTypography>
              </TopDivider>
            )}
            <Box display={"flex"} alignItems={"center"} {...(!md && { gap: 1, flexWrap: "wrap" })}>
              {md &&
                mainFilters.map((filter, i) => (
                  <FilterDropdown
                    resetFilter={() => resetFilter(filter.id)}
                    filter={filter}
                    key={filter.id}
                    onChange={updateFilter}
                    separator={md && (inlineMultiFilters || i < mainFilters.length - 1)}
                    mobile={!md}
                    prefixId={prefixId}
                    position={i === 0 ? "left" : "right"}
                  />
                ))}
              {inlineMultiFilters && (
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
          {md && (
            <ZigButton variant="text" onClick={resetFilters} id={`${prefixId}__reset-all`}>
              {t("reset")}
            </ZigButton>
          )}
        </Box>
      </Box>
      <Box
        flex={!lg ? 0 : 1}
        display={"flex"}
        justifyContent={"flex-end"}
        position={"relative"}
        alignItems={"center"}
        gap={1.5}
        ref={rightRef}
      >
        <>
          {rightComponent}
          {search !== undefined && onSearchChange && md && (
            <Box mr={"42px"}>
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
            </Box>
          )}
        </>
        {!md && secondaryFilters.length > 0 && (
          <MultiFiltersButton
            resetFilters={resetSecondaryFilters}
            defaultFilters={defaultFilters}
            filters={secondaryFilters}
            onChange={updateFilter}
            mobile={true}
            prefixId={prefixId}
          />
        )}
      </Box>
    </Box>
  );
};

export default ZigFilters;
export * from "./types";
export * from "./use";
export * from "./util";
