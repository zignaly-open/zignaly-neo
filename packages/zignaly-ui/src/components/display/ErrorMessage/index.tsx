// Dependencies
import React from "react";

// Styled Components
import { Layout, Icon } from "./styles";

// Types
import { ErrorMessageProps } from "./types";

// Assets
import ErrorAlertIcon from "assets/icons/error-alert-icon.svg";
import Typography from "../Typography";
import { dark } from "theme";
// TODO(Vetle): Refactor usage of Dark theme when light theme is ready
function ErrorMessage({ text }: ErrorMessageProps) {
  return (
    <Layout>
      <Icon>
        <ErrorAlertIcon height="12px" width="12px" color={dark["redGraphOrError"]} />
      </Icon>
      <Typography variant={"body2"} color={"redGraphOrError"} weight="regular">
        {text}
      </Typography>
    </Layout>
  );
}

export default ErrorMessage;
