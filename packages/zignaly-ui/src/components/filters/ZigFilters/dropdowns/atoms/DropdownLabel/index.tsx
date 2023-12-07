import { Box } from "@mui/material";
import ZigTypography from "components/display/ZigTypography";
import React from "react";
import { useMeasure } from "react-use";

export const DropdownLabel = ({
  minSpace = 0,
  label,
  value,
}: {
  /**
   * Minimum space reserved for the value, to avoid jumping when the value changes.
   * Set to 0 to disable because the filters calculate it automatically.
   */
  minSpace?: number;
  label: string;
  value: string;
}) => {
  const [ref, { width }] = useMeasure<HTMLDivElement>();
  console.log(width);

  return (
    <Box
      display="flex"
      gap={2}
      justifyContent="center"
      minWidth={width + (minSpace ? 16 : 0) + minSpace}
    >
      <ZigTypography fontSize={13} color={"neutral300"} ref={ref}>
        {label}
      </ZigTypography>
      <ZigTypography fontSize={14} color={"neutral100"}>
        {value}
      </ZigTypography>
    </Box>
  );
};
