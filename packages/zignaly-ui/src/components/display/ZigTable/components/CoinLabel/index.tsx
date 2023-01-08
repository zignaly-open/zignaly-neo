import React from "react";

import { Layout, WrapCoin, Coin, Name, Icon } from "./styles";

import { CoinLabelProps } from "./types";

const CoinLabel = ({ name = "TEATHER", coin = "USDT" }: CoinLabelProps) => (
  <Layout>
    <Icon coin={coin} name={name} />
    <WrapCoin>
      <Coin>{coin}</Coin>
      <Name variant={"body2"} weight={"regular"} color={"neutral300"}>
        {name}
      </Name>
    </WrapCoin>
  </Layout>
);

export default CoinLabel;
