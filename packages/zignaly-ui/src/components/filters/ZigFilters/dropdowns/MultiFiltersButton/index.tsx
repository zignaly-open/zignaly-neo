import ZigDropdown from "components/display/ZigDropdown";
import React, { useState } from "react";
import { LayoutItem } from "./styles";
import { SecondaryFiltersButtonProps } from "./type";
import { ZigSettingsIcon } from "../../../../../icons";
import { DropdownResetButton } from "../atoms/DropdownResetButton";
import { FiltersCount } from "../atoms/FilterCount";
import { FilterDropdownWrapper } from "../../styles";
import { Box } from "@mui/material";
import ZigButton from "components/inputs/ZigButton";
import MobileFilterDrawer from "../atoms/MobileFilterDrawer";
import Filter from "../../filters/Filter";

const MultiFiltersButton = ({
  resetFilters,
  filters,
  filtersChangedCount,
  onChange,
  minSpace = 90,
  mobile = false,
  prefixId,
}: SecondaryFiltersButtonProps) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  if (mobile) {
    return (
      <ZigButton
        variant="outlined"
        sx={{ py: "3px", px: filtersChangedCount > 0 ? "10px" : "12px", minWidth: 0 }}
      >
        <MobileFilterDrawer
          filters={filters}
          onChange={onChange}
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          resetFilters={resetFilters}
          prefixId={prefixId}
        />
        <Box display="flex" gap="6px" alignItems={"center"}>
          <ZigSettingsIcon width={19} height={16} onClick={() => setDrawerOpen(true)} />
          {filtersChangedCount > 0 && <FiltersCount>{filtersChangedCount}</FiltersCount>}
        </Box>
      </ZigButton>
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
