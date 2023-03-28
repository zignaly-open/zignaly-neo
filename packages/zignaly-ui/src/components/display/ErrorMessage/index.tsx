import React from "react";

import { ErrorMessageProps } from "./types";
import ZigAlertMessage from "../ZigAlertMessage";

// added for backwards compatibility
function ErrorMessage({ text }: ErrorMessageProps) {
  return <ZigAlertMessage text={text} error />;
}

export default ErrorMessage;
