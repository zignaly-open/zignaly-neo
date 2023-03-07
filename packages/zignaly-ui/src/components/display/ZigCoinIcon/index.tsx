import React, { useCallback, useState } from "react";
import { Icon, Placeholder } from "./styles";
import type { CoinSizes, ZIGCoinIconProps } from "./types";
import { sizes, COIN_SIZES } from "./types";
import { ZignalyIcon } from "../../../index";

const ZigCoinIcon = ({
  size = COIN_SIZES.MEDIUM,
  name,
  coin,
  className = "",
  bucket = "coins-binance",
}: ZIGCoinIconProps) => {
  const s = typeof size === "number" ? size : sizes[size];
  const [src, setSrc] = useState(
    `https://res.cloudinary.com/zignaly/image/upload/c_scale,w_${s},h_${s},r_max/${bucket}/${coin}`,
  );
  const onError = useCallback(() => setSrc(""), []);
  if (!coin) return null;

  return src ? (
    <Icon src={src} alt={name} size={s} className={className} onError={onError} />
  ) : coin.toLowerCase() === "zig" ? (
    <ZignalyIcon width={sizes[size as CoinSizes]} height={sizes[size as CoinSizes]} />
  ) : (
    <Placeholder size={s} className={className} as="div">
      {coin[0]}
    </Placeholder>
  );
};

export { CoinSizes };
export default ZigCoinIcon;
