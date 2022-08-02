import CoinIcon from "components/display/CoinIcon";
import Typography from "components/display/Typography";
import React from "react";
import { Column } from "utils/column";
import { Row } from "utils/row";
import { Icon } from "./styles";
import { ServiceNameProps } from "./types";

export const ServiceName = ({ cryptoName, cryptoAlt, heading, subtitle }: ServiceNameProps) => {
  return (
    <Row alignItems="center" textAlign="start">
      <Row marginLeft="36">
        <Icon>
          <CoinIcon name={cryptoAlt} coin={cryptoName} />
        </Icon>
      </Row>
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
