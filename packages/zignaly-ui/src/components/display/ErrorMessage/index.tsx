// Dependencies
import React from "react";

// Styled Components
import { Layout, Text, Icon } from "./styles";

// Types
import { ErrorMessageProps } from "./types";

// Assets
import ErrorAlertIcon from "assets/icons/error-alert-icon.svg";

function ErrorMessage({ text }: ErrorMessageProps) {
  return (
    <Layout>
      <Icon width={"18px"} height={"18px"} src={ErrorAlertIcon} alt={text} />
      <Text>{text}</Text>
    </Layout>
  );
}

export default ErrorMessage;
