import React from "react";
import ZigButton, { ZigButtonGroup, ZigButtonProps } from "../ZigButton";
import ZigTypography from "../../display/ZigTypography";
import { Box } from "@mui/system";
import { ErrorMessage } from "../../display/ZigAlertMessage";

const ZigButtonGroupInput = ({
  value,
  label,
  error,
  options,
  onChange,
}: {
  value: string;
  options: {
    id?: string;
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
        <Box sx={{ mb: 1.25 }}>
          <ZigTypography variant="body1" color="neutral200">
            {label}
          </ZigTypography>
        </Box>
      )}

      {!!label && typeof label !== "string" && label}

      <ZigButtonGroup>
        {options.map((o) => (
          <ZigButton
            id={o.id}
            onClick={() => onChange(o.value)}
            key={o.value}
            active={value === o.value}
            variant={"outlined"}
            {...(o.extraProps || {})}
          >
            {o.label}
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
