import React from "react";
import { NumericFormat, numericFormatter } from "react-number-format";
import { ZigPriceLabelProps } from "./types";
import { getPrecisionForCoin, shortenNumber } from "./util";
import ZigTypography from "../ZigTypography";
import { Variant } from "@mui/material/styles/createTypography";
import { Tooltip } from "@mui/material";

const ZigPriceLabel: React.FC<ZigPriceLabelProps> = ({
  value = 0,
  coin,
  precision,
  shorten,
  prefix,
  exact,
  usd,
  coinProps,
  showTooltip = !usd,
  alwaysShowSign = false,
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

  const {
    value: shortened,
    precision: shortenedPrecision,
    suffix: shortenSuffix,
  } = shortenNumber(+value);

  const content = (
    <ZigTypography
      {...withDefaultProps}
      sx={{ whiteSpace: "nowrap", ...(withDefaultProps?.sx || {}) }}
    >
      {!!prefix && <>{prefix}</>}
      {+value >= 0 ? alwaysShowSign ? "+" : "" : <>&ndash;</>}
      {usd && "$"}
      <NumericFormat
        value={Math.abs(shorten ? shortened : +value)}
        renderText={(v) => v}
        displayType={"text"}
        thousandSeparator={true}
        decimalScale={
          exact
            ? undefined
            : shorten
            ? shortenedPrecision
            : precision || getPrecisionForCoin(coin || "USDT", value)
        }
      />

      {shorten ? shortenSuffix : ""}

      {coin && (
        <>
          {" "}
          <ZigTypography {...withDefaultPropsCoin}>{coin}</ZigTypography>
        </>
      )}
    </ZigTypography>
  );

  return showTooltip || shorten ? (
    <Tooltip
      title={
        numericFormatter(value?.toString() ?? "", {
          thousandSeparator: true,
          displayType: "text",
        }) +
        " " +
        coin
      }
    >
      {content}
    </Tooltip>
  ) : (
    content
  );
};

export default React.memo(ZigPriceLabel);

export const ZigTablePriceLabel = (props: ZigPriceLabelProps) => (
  <ZigPriceLabel color="neutral100" coinProps={{ color: "neutral400" }} {...props} />
);
