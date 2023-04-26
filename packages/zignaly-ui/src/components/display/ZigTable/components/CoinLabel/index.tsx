import React from "react";

import { Layout, WrapCoin, Coin, Name, Icon } from "./styles";

import { CoinLabelProps } from "./types";

/**
 * @deprecated
 */
const CoinLabel = ({ name = "TEATHER", coin = "USDT" }: CoinLabelProps) => (
  <Layout>
    <Icon coin={coin} />
    <WrapCoin>
      <Coin>{coin}</Coin>
      <Name variant={"body2"} fontWeight={"regular"} color={"neutral300"}>
        {name}
      </Name>
    </WrapCoin>
  </Layout>
);

export default CoinLabel;
