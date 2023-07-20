import React from "react";

import { Layout, Icon } from "./styles";

import { ZigAlertMessageProps } from "./types";

import { ReactComponent as ErrorAlertIcon } from "assets/icons/error-alert-icon.svg";
import ZigTypography from "../ZigTypography";
import { useTheme } from "@mui/material";

// TODO(Vetle): Refactor usage of Dark theme when light theme is ready
function ZigAlertMessage({ text, error, warning, id }: ZigAlertMessageProps) {
  const { palette } = useTheme();
  return (
    <Layout id={id}>
      <Icon>
        <ErrorAlertIcon
          height="24px"
          width="24px"
          color={error ? palette.redGraphOrError : warning ? palette.yellow : palette.neutral400}
        />
      </Icon>
      <ZigTypography
        variant="body2"
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
export const ErrorMessage: React.FC<Pick<ZigAlertMessageProps, "text" | "id">> = ({ text, id }) => (
  <ZigAlertMessage text={text} error id={id} />
);
