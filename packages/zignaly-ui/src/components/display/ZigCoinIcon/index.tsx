import React from "react";
import { Icon } from "./styles";
import { CoinSizes, ZIGCoinIconProps, COIN_SIZES, sizes } from "./types";

const ZigCoinIcon = ({
  size = COIN_SIZES.MEDIUM,
  name,
  coin,
  className = "",
}: ZIGCoinIconProps) => {
  if (!coin) return null;

  const s = typeof size === "number" ? size : sizes[size];

  return (
    <Icon
      src={`https://res.cloudinary.com/zignaly/image/upload/c_scale,w_${s},h_${s},r_max/coins/${coin}`}
      alt={name}
      size={s}
      className={className}
    />
  );
};

export { CoinSizes };
export default ZigCoinIcon;
