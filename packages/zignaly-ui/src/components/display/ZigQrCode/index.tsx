import { QRCodeSVG } from "qrcode.react";
import React from "react";
import { Column } from "utils/column";
import { QRCodeContainer } from "./styles";
import ZigTypography from "../ZigTypography";

// TODO: rename to ZigQRCode
const ZigQrCode = ({
  url = "www.zignaly.com",
  label = "",
  id,
  extraInfo,
}: {
  url?: string;
  label?: string;
  id?: string;
  extraInfo?: JSX.Element;
}) => {
  return (
    <Column justifyContent="center" alignItems="center" gap={8}>
      {label && (
        <ZigTypography variant="h4" color="neutral100" id={`${id}-label`}>
          {label}
        </ZigTypography>
      )}
      <QRCodeContainer>
        {extraInfo && (
          <ZigTypography
            color="neutral600"
            lineHeight="20px"
            fontSize="13px"
            marginTop="-8px"
            marginBottom="7px"
          >
            {extraInfo}
          </ZigTypography>
        )}
        <QRCodeSVG size={160} value={url} id={id} />
      </QRCodeContainer>
    </Column>
  );
};

export default ZigQrCode;
