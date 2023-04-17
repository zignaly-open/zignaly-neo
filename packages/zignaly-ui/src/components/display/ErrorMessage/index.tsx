import React from "react";

import { ErrorMessageProps } from "./types";
import ZigAlertMessage from "../ZigAlertMessage";

// added for backwards compatibility
function ErrorMessage({ text, id }: ErrorMessageProps) {
  return <ZigAlertMessage text={text} error id={id} />;
}

export default ErrorMessage;
