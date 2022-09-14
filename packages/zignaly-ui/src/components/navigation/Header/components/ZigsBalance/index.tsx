import React from "react";
import NumberFormat from "react-number-format";

import { ZigBalanceProps } from "./types";

import { Layout, StyledWalletIcon, Balance } from "./styles";

import { utils } from "ethers";

function ZigBalance({ balance, className }: ZigBalanceProps) {
  return (
    <Layout className={className}>
      <StyledWalletIcon />
      <NumberFormat
        value={utils.formatUnits((balance || "0").toString())}
        displayType={"text"}
        thousandSeparator={true}
        renderText={(value) => <Balance>{value} ZIG</Balance>}
      />
    </Layout>
  );
}

export default ZigBalance;
