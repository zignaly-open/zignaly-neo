import CoinIcon from "components/display/CoinIcon";
import Typography from "components/display/Typography";
import React from "react";
import { Column, Icon, Row } from "./styles";
import { ServiceNameProps } from "./types";

export const ServiceName = ({
  cryptoName,
  cryptoAlt,
  heading,
  subtitle,
}: ServiceNameProps) => {
  return (
    <Row>
      <Icon>
        <CoinIcon name={cryptoAlt} coin={cryptoName}></CoinIcon>
      </Icon>
      <Column>
        <Typography variant="body1" weight="medium" color="neutral100">
          {heading}
        </Typography>
        <Typography variant="body2" weight="medium" color="neutral400">
          {subtitle}
        </Typography>
        <Typography variant="body2" weight="medium" color="neutral400">
          {cryptoName}
        </Typography>
      </Column>
    </Row>
  );
};
