import React from "react";
import { QRCodeSVG } from "qrcode.react";
import Typography from "../Typography";
import { Layout, Container } from "./styles";
import { LevelEnum, QRCodeProps } from "./types";

const QRCode = ({
  label = null,
  value = "Example QR Code",
  bgColor = "#fff",
  fgColor = "#000",
  size = 128,
  level = LevelEnum.L,
  includeMargin = false,
}: QRCodeProps) => {
  return (
    <Layout>
      {label && (
        <Typography variant="h2" color="neutral100">
          {label}
        </Typography>
      )}
      <Container>
        <QRCodeSVG
          size={size}
          level={level}
          value={value}
          bgColor={bgColor}
          fgColor={fgColor}
          includeMargin={includeMargin}
        />
      </Container>
    </Layout>
  );
};

export default QRCode;
