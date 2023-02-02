import React from "react";
import { LoadingButton, LoadingButtonProps } from "@mui/lab";
import { ButtonGroup, styled, Tooltip } from "@mui/material";
import { dark } from "../../../theme";
import ZigButton, { ZigButtonGroup, ZigButtonProps } from "../ZigButton";
import ZigTypography from "../../display/ZigTypography";
import ErrorMessage from "../../display/ErrorMessage";
import { Box } from "@mui/system";

const ZigButtonGroupInput = ({
  value,
  label,
  error,
  options,
  onChange,
}: {
  value: string;
  options: {
    value: string;
    label: string | JSX.Element;
    tooltip?: string;
    extraProps?: ZigButtonProps;
  }[];
  error?: string | JSX.Element;
  label?: string | JSX.Element;
  onChange: (value: string) => void;
}) => {
  return (
    <>
      {typeof label === "string" && (
        <Box sx={{ mb: 0.5 }}>
          <ZigTypography variant="body1" color="neutral200" fontWeight={500}>
            {label}
          </ZigTypography>
        </Box>
      )}

      {!!label && typeof label !== "string" && label}

      <ZigButtonGroup>
        {options.map((o) => (
          <ZigButton
            onClick={() => onChange(o.value)}
            key={o.value}
            active={value === o.value}
            variant={"outlined"}
            {...(o.extraProps || {})}
          >
            {label}
          </ZigButton>
        ))}
      </ZigButtonGroup>

      {!!error && (
        <Box sx={{ marginTop: "3px" }}>
          <ErrorMessage text={error} />
        </Box>
      )}
    </>
  );
};

export default ZigButtonGroupInput;
