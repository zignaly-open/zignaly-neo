import { Box } from "@mui/material";
import ZigTypography from "components/display/ZigTypography";
import React from "react";
import { LABEL_LENGTH_TO_WIDTH } from "../../util";

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
  return (
    <Box
      display="flex"
      gap={2}
      justifyContent="center"
      minWidth={label.length * LABEL_LENGTH_TO_WIDTH + (minSpace ? 16 : 0) + minSpace}
    >
      <ZigTypography fontSize={13} color={"neutral300"}>
        {label}
      </ZigTypography>
      <ZigTypography fontSize={14} color={"neutral100"}>
        {value}
      </ZigTypography>
    </Box>
  );
};
