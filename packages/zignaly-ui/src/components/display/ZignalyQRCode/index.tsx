import { QRCodeCanvas } from "qrcode.react";
import React from "react";
import { QRCodeContainer } from "./styles";

const ZignalyQRCode = ({ url }: { url: string }) => {
  return (
    <QRCodeContainer>
      <QRCodeCanvas size={160} value={url} />
    </QRCodeContainer>
  );
};

export default ZignalyQRCode;
