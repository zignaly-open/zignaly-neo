import { QRCodeSVG } from "qrcode.react";
import React from "react";
import { Column } from "utils/column";
import { QRCodeContainer } from "./styles";
import ZigTypography from "../ZigTypography";

// TODO: rename to ZigQRCode
const ZigQrCode = ({ url = "www.zignaly.com", label = "" }: { url?: string; label?: string }) => {
  return (
    <Column justifyContent="center" alignItems="center" gap={8}>
      {label && (
        <ZigTypography variant="h4" color="neutral100">
          {label}
        </ZigTypography>
      )}
      <QRCodeContainer>
        <QRCodeSVG size={160} value={url} />
      </QRCodeContainer>
    </Column>
  );
};

export default ZigQrCode;
