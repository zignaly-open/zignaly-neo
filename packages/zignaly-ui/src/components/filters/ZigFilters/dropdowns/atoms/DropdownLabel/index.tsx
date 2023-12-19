import { Box } from "@mui/material";
import ZigTypography from "components/display/ZigTypography";
import React from "react";
import { LABEL_LENGTH_TO_WIDTH } from "../../util";

const GAP = 2;

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
  value: string | JSX.Element;
}) => {
  return (
    <Box
      display="flex"
      gap={GAP}
      justifyContent="center"
      alignItems={"center"}
      minWidth={label.length * LABEL_LENGTH_TO_WIDTH + (minSpace ? GAP * 8 : 0) + minSpace}
    >
      <ZigTypography fontSize={13} color={"neutral300"}>
        {label}
      </ZigTypography>
      {typeof value === "function" ? (
        value
      ) : (
        <ZigTypography fontSize={14} color={"neutral100"}>
          {value}
        </ZigTypography>
      )}
    </Box>
  );
};
