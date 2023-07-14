import React from "react";
import { NumericFormat, numericFormatter } from "react-number-format";
import { ZigPriceLabelProps } from "./types";
import { getPrecisionForCoin, shortenNumber } from "./util";
import ZigTypography from "../ZigTypography";
import { Variant } from "@mui/material/styles/createTypography";
import { Box, Tooltip } from "@mui/material";
import { numberOfDecimals, trimZeros } from "../../../utils/numbers";
import { ZigCoinIcon } from "../../../index";

const ZigPriceLabel: React.FC<ZigPriceLabelProps> = ({
  id,
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
  showApproximate = false,
  showCoinIcon = false,
  label = "",
  ...otherProps
}) => {
  const withDefaultPropsCoin = {
    variant: "body2" as Variant,
    color: "neutral200",
    fontWeight: "regular",
    ml: "0.4em",
    ...(coinProps || ""),
  };

  const withDefaultProps = {
    color: "contrasting",
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
    <>
      <ZigTypography
        id={id}
        {...withDefaultProps}
        sx={{
          whiteSpace: "nowrap",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          ...(withDefaultProps?.sx || {}),
        }}
      >
        <Box display={"flex"} flexDirection={"column"}>
          {label && (
            <ZigTypography variant={"h2"} mb={"12px"}>
              {label}
            </ZigTypography>
          )}
          <Box display={"flex"} alignItems={"center"}>
            {showCoinIcon && (
              <Box mr={"10px"} mt={"5px"}>
                <ZigCoinIcon size={"medium"} coin={coin || "USDT"} />
              </Box>
            )}
            {showApproximate &&
              numberOfDecimals(value) >
                (precision || getPrecisionForCoin(coin || "USDT", value)) && <>~</>}
            {!!prefix && <>{prefix}</>}
            {+value >= 0 ? alwaysShowSign ? "+" : "" : <>&ndash;</>}
            {usd && "$"}
            <NumericFormat
              value={Math.abs(shorten ? shortened : +value)}
              renderText={(v) => (showApproximate ? v : trimZeros(v))}
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

            {coin && !usd && (
              <>
                {" "}
                <ZigTypography {...withDefaultPropsCoin}>{coin}</ZigTypography>
              </>
            )}
          </Box>
        </Box>
      </ZigTypography>
    </>
  );

  return showTooltip || shorten ? (
    <Tooltip
      disableInteractive
      title={`${usd ? "$" : ""}${numericFormatter(trimZeros((+value)?.toFixed(8)) ?? "", {
        thousandSeparator: true,
        displayType: "text",
      })} ${!usd ? coin ?? "" : ""}`}
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
