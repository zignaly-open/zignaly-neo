import React from "react";
import { ToasterProps } from "./types";
import * as styled from "./styles";
import { ReactComponent as SuccessIcon } from "assets/icons/check-icon.svg";
import InfoIcon from "@mui/icons-material/Info";
import { ReactComponent as ErrorAlertIcon } from "assets/icons/error-alert-icon.svg";
import ZigTypography from "../ZigTypography";
import { useTheme } from "@mui/material";

const Toaster = ({ variant = "error", size = "large", caption = "", id }: ToasterProps) => {
  const { palette } = useTheme();
  return (
    <styled.ToastContainer variant={variant} size={size} id={id}>
      <styled.IconContainer>
        {variant === "error" && <ErrorAlertIcon color={palette.redGraphOrError} />}
        {variant === "success" && <SuccessIcon color={palette.greenGraph} />}
        {variant === "info" && <InfoIcon fill={palette.neutral600} />}
      </styled.IconContainer>

      <styled.Caption>
        <ZigTypography
          variant={size === "large" ? "body1" : "body2"}
          /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
          /* @ts-ignore */
          color={{ error: "redGraphOrError", success: "greenGraph" }[variant]}
          fontWeight="regular"
        >
          {caption}
        </ZigTypography>
      </styled.Caption>
    </styled.ToastContainer>
  );
};

export default Toaster;
