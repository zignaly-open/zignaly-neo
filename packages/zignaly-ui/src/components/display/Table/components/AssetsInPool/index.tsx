import Typography from "components/display/Typography";
import React from "react";
import NumberFormat from "react-number-format";
import { Gap } from "utils/gap";
import { Icon } from "./styles";
import { AssetsInPoolProps } from "./types";
import { ReactComponent as WhaleIcon } from "assets/icons/whale-icon.svg";
import { Column } from "utils/column";
import { Row } from "utils/row";

const AssetsInPool = ({ assetsValue, numberOfInvestors }: AssetsInPoolProps) => {
  return (
    <Row justifyContent="center">
      <Gap gap={16} />
      <Column>
        <Gap gap={2.5} />
        <Column alignItems="end">
          <Typography variant="body1" weight="regular" color="neutral000">
            <NumberFormat
              prefix={"$"}
              value={assetsValue}
              displayType={"text"}
              thousandSeparator={true}
            />
          </Typography>
        </Column>
        <Gap gap={6} />
        <Column justifyContent="center" alignItems="start">
          <Typography variant="h5" color="neutral400">
            {numberOfInvestors} investors
          </Typography>
        </Column>
      </Column>
      <Icon>{assetsValue >= 1000000 && <WhaleIcon />}</Icon>
    </Row>
  );
};

export default AssetsInPool;
