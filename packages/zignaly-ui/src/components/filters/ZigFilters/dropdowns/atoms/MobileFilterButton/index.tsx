import React, { useState } from "react";
import MobileFilterDrawer from "../MobileFilterDrawer";
import { MobileFiltersDrawerProps } from "./type";
import ZigButton from "components/inputs/ZigButton";
import ZigTypography from "components/display/ZigTypography";

const MobileFilterButton = ({
  filter,
  onChange,
  resetFilter,
  label,
  prefixId,
}: MobileFiltersDrawerProps) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <>
      <MobileFilterDrawer
        filters={filter}
        onChange={onChange}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        resetFilters={resetFilter}
        prefixId={prefixId}
      />
      <ZigButton
        variant="outlined"
        sx={{ p: "2px 14px" }}
        id={`${prefixId}__slider-button-${filter.id}`}
        onClick={() => setDrawerOpen(true)}
      >
        <ZigTypography>{label}</ZigTypography>
      </ZigButton>
    </>
  );
};

export default MobileFilterButton;
