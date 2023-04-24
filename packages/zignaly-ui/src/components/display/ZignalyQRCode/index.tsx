import { QRCodeSVG } from "qrcode.react";
import React from "react";
import { Column } from "utils/column";
import Typography from "../Typography";
import { QRCodeContainer } from "./styles";

// TODO: rename to ZigQRCode
const ZignalyQRCode = ({
  url = "www.zignaly.com",
  label = "",
}: {
  url?: string;
  label?: string;
}) => {
  return (
    <Column justifyContent="center" alignItems="center" gap={8}>
      {label && (
        <Typography variant="h4" color="neutral100">
          {label}
        </Typography>
      )}
      <QRCodeContainer>
        <QRCodeSVG size={160} value={url} />
      </QRCodeContainer>
    </Column>
  );
};

export default ZignalyQRCode;
