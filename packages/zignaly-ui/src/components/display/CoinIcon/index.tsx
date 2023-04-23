import React, { useCallback, useEffect, useState } from "react";
import { sizes, Image, Layout } from "./styles";

import { CoinSize, CoinSizes, CoinTypeProps } from "./types";

/**
 * @deprecated
 */
const CoinIcon = ({ size = CoinSizes.Medium, name, coin, className = "" }: CoinTypeProps) => {
  const [src, setSrc] = useState(``);

  const srcFallBack = `https://res.cloudinary.com/zignaly/image/upload/c_scale,w_${
    sizes[size as CoinSize]
  },h_${sizes[size as CoinSize]},r_max/coins-binance/BTC`;

  const onError = useCallback(() => setSrc(srcFallBack), []);
  useEffect(() => {
    setSrc(
      `https://res.cloudinary.com/zignaly/image/upload/c_scale,w_${sizes[size as CoinSize]},h_${
        sizes[size as CoinSize]
      },r_max/coins-binance/${coin}`,
    );
  }, [coin]);

  return (
    <>
      <Layout size={size} className={className} data-testid="coin-icon-view">
        <Image src={src} alt={name} onError={onError} />
      </Layout>
    </>
  );
};

export default CoinIcon;
