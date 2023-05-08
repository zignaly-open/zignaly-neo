import React from "react";

import { Layout, Icon } from "./styles";

import { ZigAlertMessageProps } from "./types";

import { ReactComponent as ErrorAlertIcon } from "assets/icons/error-alert-icon.svg";
import { dark } from "theme";
import ZigTypography from "../ZigTypography";

// TODO(Vetle): Refactor usage of Dark theme when light theme is ready
function ZigAlertMessage({ text, error, warning, id }: ZigAlertMessageProps) {
  return (
    <Layout id={id}>
      <Icon>
        <ErrorAlertIcon
          height="24px"
          width="24px"
          color={error ? dark.redGraphOrError : warning ? dark.yellow : dark.neutral400}
        />
      </Icon>
      <ZigTypography
        variant="body2"
        sx={{ color: error ? dark.redGraphOrError : warning ? dark.yellow : dark.neutral400 }}
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
