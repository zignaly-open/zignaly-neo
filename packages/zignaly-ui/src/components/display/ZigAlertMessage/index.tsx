import React from "react";

import { Layout, Icon } from "./styles";

import { ZigAlertMessageProps } from "./types";

import { ReactComponent as ErrorAlertIcon } from "assets/icons/error-alert-icon.svg";
import ZigTypography from "../ZigTypography";
import { useTheme } from "@mui/material";

// TODO(Vetle): Refactor usage of Dark theme when light theme is ready
function ZigAlertMessage({
  text,
  error,
  warning,
  id,
  variant = "body2",
  size = "normal",
}: ZigAlertMessageProps) {
  const { palette } = useTheme();
  return (
    <Layout id={id}>
      <Icon>
        <ErrorAlertIcon
          height={size === "small" ? "16px" : "24px"}
          width={size === "small" ? "16px" : "24px"}
          color={error ? palette.redGraphOrError : warning ? palette.yellow : palette.neutral400}
        />
      </Icon>
      <ZigTypography
        variant={variant}
        fontSize={size === "small" ? "11px" : undefined}
        sx={{
          color: error ? palette.redGraphOrError : warning ? palette.yellow : palette.neutral400,
        }}
      >
        {text}
      </ZigTypography>
    </Layout>
  );
}

export default ZigAlertMessage;

// added for backwards compatibility
export const ErrorMessage: React.FC<
  Pick<ZigAlertMessageProps, "text" | "id" | "variant" | "size">
> = ({ text, id, variant = "body2", size = "normal" }) => (
  <ZigAlertMessage size={size} text={text} error id={id} variant={variant} />
);
