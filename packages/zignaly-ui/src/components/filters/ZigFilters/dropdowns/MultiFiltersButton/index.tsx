import ZigDropdown from "components/display/ZigDropdown";
import React, { useMemo, useState } from "react";
import { LayoutItem } from "./styles";
import { SecondaryFiltersButtonProps } from "./type";
import { ZigSettingsIcon } from "../../../../../icons";
import { DropdownResetButton } from "../atoms/DropdownResetButton";
import { isEqual } from "lodash-es";
import { FiltersCount } from "../atoms/FilterCount";
import { FilterDropdownWrapper } from "../../styles";
import { Box } from "@mui/material";
import ZigButton from "components/inputs/ZigButton";
import MobileFilterDrawer from "../atoms/MobileFilterDrawer";
import Filter from "../../filters/Filter";

const MultiFiltersButton = ({
  resetFilters,
  filters,
  defaultFilters,
  onChange,
  minSpace = 90,
  mobile = false,
  prefixId,
}: SecondaryFiltersButtonProps) => {
  const filtersChangedCount = useMemo(() => {
    return filters.filter((filter) => {
      const defaultFilter = defaultFilters?.find((defaultFilter) => defaultFilter.id === filter.id);
      return !isEqual(filter.value, defaultFilter?.value);
    }).length;
  }, [filters, defaultFilters]);

  const [drawerOpen, setDrawerOpen] = useState(false);

  if (mobile) {
    return (
      <>
        <MobileFilterDrawer
          filters={filters}
          onChange={onChange}
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          resetFilters={resetFilters}
          prefixId={prefixId}
        />
        <ZigButton
          variant="outlined"
          sx={{ py: "3px", px: filtersChangedCount > 0 ? "10px" : "12px", minWidth: 0 }}
          onClick={() => {
            setDrawerOpen(true);
          }}
        >
          <Box display="flex" gap="6px" alignItems={"center"}>
            <ZigSettingsIcon width={19} height={16} />
            {filtersChangedCount > 0 && <FiltersCount>{filtersChangedCount}</FiltersCount>}
          </Box>
        </ZigButton>
      </>
    );
  }

  return (
    <FilterDropdownWrapper>
      <ZigDropdown
        id={`${prefixId}__multi-dropdown`}
        component={({ open }) => (
          <LayoutItem active={open} minWidth={minSpace}>
            <ZigSettingsIcon width={22.5} height={19} />
            {filtersChangedCount > 0 && <FiltersCount>{filtersChangedCount}</FiltersCount>}
          </LayoutItem>
        )}
        options={filters
          .flatMap((filter) => [
            {
              element: (
                <Filter filter={filter} onChange={onChange} mobile={false} key={filter.id} />
              ),
            },
            { separator: true },
          ])
          .concat([
            {
              element: (
                <DropdownResetButton
                  id={`${prefixId}__multi-dropdown-reset`}
                  onClick={resetFilters}
                />
              ),
            },
          ])}
      />
    </FilterDropdownWrapper>
  );
};

export default MultiFiltersButton;
