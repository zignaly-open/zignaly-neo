import React from "react";

import { ErrorMessageProps } from "./types";
import ZigAlertMessage from "../ZigAlertMessage";

// TODO(Vetle): Refactor usage of Dark theme when light theme is ready
function ErrorMessage({ text }: ErrorMessageProps) {
  return <ZigAlertMessage text={text} error />;
}

export default ErrorMessage;
