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

  const removeTrailingZeros = (value: string) => {
    if (value === undefined || value === null) {
      return "";
    }
    const stringValue = value.toString();
    const decimalIndex = stringValue.indexOf(".");
    if (decimalIndex === -1) {
      return stringValue;
    }
    let endIndex = stringValue.length - 1;
    while (
      (stringValue[endIndex] === "0" || stringValue[endIndex] === ".") &&
      endIndex >= decimalIndex
    ) {
      endIndex--;
    }
    return stringValue.slice(0, endIndex + 1);
  };

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
        renderText={removeTrailingZeros}
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
      title={`${numericFormatter((+value)?.toString() ?? "", {
        thousandSeparator: true,
        displayType: "text",
      })}${coin ?? ""}`}
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
