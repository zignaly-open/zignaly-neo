import { QRCodeSVG } from "qrcode.react";
import React from "react";
import { QRCodeContainer } from "./styles";
import ZigTypography from "../ZigTypography";
import { Box } from "@mui/material";

// TODO: rename to ZigQRCode
const ZigQrCode = ({
  url = "www.zignaly.com",
  label = "",
  id,
  extraInfo,
  className,
  size = 160,
  width = 200,
  height = 200,
}: {
  url?: string;
  label?: string;
  id?: string;
  extraInfo?: JSX.Element;
  className?: string;
  size?: number;
  width?: number;
  height?: number;
}) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap="8px"
      className={className}
    >
      {label && (
        <ZigTypography variant="h4" color="neutral100" id={`${id}-label`}>
          {label}
        </ZigTypography>
      )}
      <QRCodeContainer width={width} height={height}>
        {extraInfo && (
          <ZigTypography
            color="neutral600"
            lineHeight="13px"
            fontSize="11px"
            marginTop="-8px"
            marginBottom="7px"
          >
            {extraInfo}
          </ZigTypography>
        )}
        <QRCodeSVG size={size} value={url} id={id} />
      </QRCodeContainer>
    </Box>
  );
};

export default ZigQrCode;
