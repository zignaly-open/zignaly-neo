import ZigDropdown from "components/display/ZigDropdown";
import ZigTypography from "components/display/ZigTypography";
import React, { useMemo } from "react";
import SliderFilter from "../../filters/SliderFilter";
import { Box } from "@mui/material";
import { ZigFilter, ZigFiltersType } from "../../types";
import { LayoutItem } from "./styles";
import { FilterItemProps } from "./type";

// move to SliderFilter
const SliderFilterDropdown = ({ filter, onChange }: FilterItemProps) => {
  const displayValue = useMemo(() => {
    if (filter.type === "slider") {
      const min = filter.min ?? 0;
      const max = filter.max ?? 100;
      if (filter.value[0] < min && filter.value[1] > max) return "All";
      else if (filter.value[0] < min) return `< ${filter.value[1]}%`;
      else if (filter.value[1] > max) return `> ${filter.value[0]}%`;
      else return `${filter.value[0]}% to ${filter.value[1]}%`;
    }
    return filter.value;
  }, [filter.value]);

  return (
    <ZigDropdown
      component={({ open }) => (
        <LayoutItem active={open}>
          <Box display="flex" gap={1} justifyContent="center">
            <ZigTypography fontSize={13} color={"neutral300"}>
              {filter.label}
            </ZigTypography>
            <ZigTypography fontSize={14} color={"neutral100"}>
              {displayValue}
            </ZigTypography>
          </Box>
        </LayoutItem>
      )}
      options={[
        {
          element: (
            <SliderFilter
              value={filter.value}
              onChange={onChange}
              allowNoMin={filter.allowNoMin}
              allowNoMax={filter.allowNoMax}
            />
          ),
        },
        { separator: true },
        {
          label: (
            <ZigTypography
              component={"p"}
              sx={{
                textAlign: "center",
                p: "4px 9px 3px",
                fontSize: "14px",
                width: "100%",
              }}
              color={"links"}
            >
              reset
            </ZigTypography>
          ),
          id: "account-menu-dropdown__logout",
          onClick: () => {},
        },
      ]}
    />
  );
};

export default SliderFilterDropdown;
