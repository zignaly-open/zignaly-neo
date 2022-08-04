// Dependencies
import React, { useMemo } from "react";
import { utils } from "ethers";
import NumberFormat from "react-number-format";

// Styles
import * as styled from "./styles";

// Assets
import ZigCoinIcon from "assets/images/zignaly-coin.svg?url";

// Components
import Typography from "../Typography";

// Utils
import { RankTypes, RankTypesId, ZigWalletIndicatorProps } from "./types";

const ZigWalletIndicator = ({
  zigs = 0,
  rankId = RankTypesId.DOLPHIN,
}: ZigWalletIndicatorProps) => {
  const renderZigsCoins = useMemo(
    () => (
      <NumberFormat
        value={utils.formatUnits((zigs || "0").toString())}
        displayType={"text"}
        thousandSeparator={true}
        renderText={(value) => (
          <styled.Value>
            <Typography>{value}</Typography>
            <styled.Token>ZIG</styled.Token>
          </styled.Value>
        )}
      />
    ),
    [zigs],
  );

  const renderLevel = useMemo(
    () => (
      <styled.Level>
        <styled.RankIcon src={RankTypes[rankId].icon} />
        <Typography variant={"h5"}>{RankTypes[rankId].name}</Typography>
      </styled.Level>
    ),
    [rankId],
  );

  return (
    <styled.Layout>
      <styled.Icon src={ZigCoinIcon} />
      <styled.Data>
        {renderZigsCoins}
        {renderLevel}
      </styled.Data>
    </styled.Layout>
  );
};

export { RankTypes, RankTypesId };
export default ZigWalletIndicator;
