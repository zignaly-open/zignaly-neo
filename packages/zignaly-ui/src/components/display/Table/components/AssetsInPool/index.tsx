import Typography from "components/display/Typography";
import React from "react";
import NumberFormat from "react-number-format";
import { Gap } from "utils/gap";
import { Column, Icon, Row } from "./styles";
import { AssetsInPoolProps } from "./types";
import WhaleIcon from "assets/icons/whale-icon.svg";

const AssetsInPool = ({ assetsValue, numberOfInvestors }: AssetsInPoolProps) => {
  return (
    <Row>
      <Gap gap={17}></Gap>
      <Column>
        <Gap gap={2.5}></Gap>
        <Typography variant="body1" weight="regular" color="neutral000">
          <NumberFormat
            prefix={"$"}
            value={assetsValue}
            displayType={"text"}
            thousandSeparator={true}
          />
        </Typography>
        <Gap gap={6}></Gap>
        <Typography variant="h5" color="neutral400">
          {numberOfInvestors} investors
        </Typography>
      </Column>
      <Icon>
        <WhaleIcon />
      </Icon>
    </Row>
  );
};

export default AssetsInPool;
