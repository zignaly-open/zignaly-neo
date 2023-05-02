import React from "react";
import { ToasterProps } from "./types";
import * as styled from "./styles";
import { ReactComponent as SuccessIcon } from "assets/icons/check-icon.svg";
import InfoIcon from "@mui/icons-material/Info";
import { ReactComponent as ErrorAlertIcon } from "assets/icons/error-alert-icon.svg";
import { dark } from "theme";
import ZigTypography from "../ZigTypography";

const Toaster = ({ variant = "error", size = "large", caption = "" }: ToasterProps) => {
  return (
    <styled.ToastContainer variant={variant} size={size}>
      <styled.IconContainer>
        {variant === "error" && <ErrorAlertIcon color={dark.redGraphOrError} />}
        {variant === "success" && <SuccessIcon color={dark.greenGraph} />}
        {variant === "info" && <InfoIcon fill={dark.neutral600} />}
      </styled.IconContainer>

      <styled.Caption>
        <ZigTypography
          variant={size === "large" ? "body1" : "body2"}
          color={variant === "error" ? "redGraphOrError" : "greenGraph"}
          fontWeight="regular"
        >
          {caption}
        </ZigTypography>
      </styled.Caption>
    </styled.ToastContainer>
  );
};

export default Toaster;
