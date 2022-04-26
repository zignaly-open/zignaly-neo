// Dependencies
import React from "react";

// Styles
import { sizes, Image, Layout } from "./styles";

// Types
import { CoinSizes, CoinTypeProps } from "./types";

const CoinIcon = ({ size = CoinSizes.MEDIUM, name, coin, className = "" }: CoinTypeProps) => (
  <Layout className={[size, className] as any} data-testid="coin-icon-view">
    <Image
      src={`https://res.cloudinary.com/zignaly/image/upload/c_scale,w_${
        sizes[size as CoinSizes]
      },h_${sizes[size as CoinSizes]},r_max/coins-binance/${coin}`}
      alt={name}
    />
  </Layout>
);

export { CoinSizes };
export default CoinIcon;
