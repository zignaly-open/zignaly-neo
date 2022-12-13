import React from "react";
import NumberFormat from "react-number-format";
import { ZigPriceLabelProps } from "./types";
import { getPrecisionForCoin } from "./util";
import ZigTypography from "../ZigTypography";
import { Variant } from "@mui/material/styles/createTypography";

const ZigPriceLabel: React.FC<ZigPriceLabelProps> = ({
  value = 0,
  coin,
  precision,
  exact,
  usd,
  coinProps,
  ...otherProps
}) => {
  const withDefaultPropsCoin = {
    variant: "body2" as Variant,
    color: "neutral200",
    fontWeight: "regular",
    ...(coinProps || ""),
  };

  const withDefaultProps = {
    color: "almostWhite",
    variant: "body1" as Variant,
    fontWeight: "500",
    ...(otherProps || ""),
  };

  return (
    <ZigTypography {...withDefaultProps}>
      {+value >= 0 ? "" : <>&ndash;</>}
      {usd && "$"}
      <NumberFormat
        value={Math.abs(+value)}
        renderText={(v) => v}
        displayType={"text"}
        thousandSeparator={true}
        decimalScale={exact ? undefined : precision || getPrecisionForCoin(coin || "USDT", value)}
      />

      {coin && (
        <>
          {" "}
          <ZigTypography {...withDefaultPropsCoin}>{coin}</ZigTypography>
        </>
      )}
    </ZigTypography>
  );
};

export default React.memo(ZigPriceLabel);
