import React, { useCallback, useState } from "react";
import { Icon, Placeholder } from "./styles";
import { COIN_SIZES, sizes } from "./types";
import type { ZIGCoinIconProps, CoinSizes } from "./types";
import { ZignalyIcon } from "../../../index";

const ZigCoinIcon = ({
  size = COIN_SIZES.Medium,
  coin,
  // FIXME: wtf are we passing a classname?
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
    <Icon src={src} alt={coin} size={s} className={className} onError={onError} />
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
