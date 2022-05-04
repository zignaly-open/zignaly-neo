// Dependencies
import React, { useMemo } from "react";
import NumberFormat from "react-number-format";

// Types
import { ZigBalanceProps } from "./types";

// Components
import { Layout, StyledWalletIcon, Balance } from "./styles";

// Utils
import { utils } from "ethers";

function ZigBalance({ balance }: ZigBalanceProps) {
  /**
   * @var renderZigsCoins
   * @description Renderize the current balance with format
   */
  const renderZigsCoins = useMemo(
    () => (
      <NumberFormat
        value={utils.formatUnits((balance || "0").toString())}
        displayType={"text"}
        thousandSeparator={true}
        renderText={(value) => <Balance>{value} ZIG</Balance>}
      />
    ),
    [balance],
  );

  return (
    <Layout>
      <StyledWalletIcon />
      {renderZigsCoins}
    </Layout>
  );
}

export default ZigBalance;
