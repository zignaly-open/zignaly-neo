import React from "react";

import { Layout, Icon } from "./styles";

import { ErrorMessageProps } from "./types";

import { ReactComponent as ErrorAlertIcon } from "assets/icons/error-alert-icon.svg";
import { dark } from "theme";
import ZigTypography from "../ZigTypography";

// TODO(Vetle): Refactor usage of Dark theme when light theme is ready
function ErrorMessage({ text }: ErrorMessageProps) {
  return (
    <Layout>
      <Icon>
        <ErrorAlertIcon height="24px" width="24px" color={dark.redGraphOrError} />
      </Icon>
      <ZigTypography variant="body2" color="redGraphOrError">
        {text}
      </ZigTypography>
    </Layout>
  );
}

export default ErrorMessage;
