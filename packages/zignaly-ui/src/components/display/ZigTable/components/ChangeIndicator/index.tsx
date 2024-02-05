import React from "react";
import { NumericFormat } from "react-number-format";
import { useTheme } from "styled-components";
import BigNumber from "bignumber.js";
import { Indicator, ValueIndicator } from "./styles";
import { ChangeIndicatorProps } from "./types";
import { Box, Tooltip } from "@mui/material";
import ZigTypography from "../../../ZigTypography";
import { isNil } from "lodash-es";

// Fix for react-number-format not showing .0 decimal
// https://github.com/s-yadav/react-number-format/issues/820
const adjustDecimals = (value: BigNumber, decimals: number) => {
  const decimalPart = value.abs().mod(1);
  if (decimals == 1) {
    // Fix for .95 until .99 rounded as .0 instead of integer
    if (decimalPart.gt(0.95)) return 0;
    // Fix for .01 until .05 rounded as .0 instead of integer
    else if (decimalPart.lt(0.05)) return 0;
  }

  return decimals;
};

// Fix -0.01 until -0.05 to be -0.0 instead of 0
// Also remove negative sign when hideNegativeSign is true, used when showing the indicator arrow instead
const adjustNumber = (value: BigNumber, decimals: number, hideNegativeSign?: boolean) => {
  if (decimals === 1 && value.lt(0) && value.gte(-0.05)) return 0;
  if (hideNegativeSign) return value.abs();
  return value;
};

const ChangeIndicator = ({
  id,
  value = "0",
  label,
  type = "graph",
  normalized = false,
  stableCoinOperative = false,
  style,
  labelTooltip = "",
  decimalScale = stableCoinOperative ? 2 : 8,
  smallPct = true,
  indicatorPostion = "left",
}: ChangeIndicatorProps) => {
  let bigNumberValue = new BigNumber(value);
  if (normalized) bigNumberValue = bigNumberValue.multipliedBy(100);
  const isPositiveValue = bigNumberValue.isPositive();
  const theme: any = useTheme();

  const renderIndicator = () => {
    const isZero = bigNumberValue.isZero();
    const color = isZero
      ? theme.palette.neutral300
      : isPositiveValue
      ? theme.palette.greenGraph
      : theme.palette.redGraphOrError;

    return (
      <Box display="flex" justifyContent={"center"} alignItems={"center"}>
        <ValueIndicator
          variant={type === "graph" ? "body2" : "body1"}
          color={color}
          smallPct={smallPct && type !== "only_number" && !isNil(value)}
          style={style}
          whiteSpace={"nowrap"}
        >
          {!isZero && type === "graph" && indicatorPostion === "left" && (
            <Indicator isPositive={isPositiveValue} color={color} preserveAspectRatio="none" />
          )}
          <NumericFormat
            value={adjustNumber(
              bigNumberValue,
              decimalScale,
              type === "graph" && indicatorPostion === "left",
            ).toFixed()}
            displayType={"text"}
            suffix={type === "only_number" || smallPct ? "" : "%"}
            thousandSeparator={","}
            decimalScale={adjustDecimals(bigNumberValue, decimalScale)}
            fixedDecimalScale={stableCoinOperative}
            id={id}
          />
          {!isZero && type === "graph" && indicatorPostion === "right" && (
            <Indicator isPositive={isPositiveValue} color={color} preserveAspectRatio="none" />
          )}
        </ValueIndicator>
      </Box>
    );
  };

  return (
    <Tooltip title={labelTooltip}>
      <Box justifyContent={"center"}>
        {!isNaN(+value) ? (
          <>
            {renderIndicator()}
            {label && (
              <ZigTypography display={"block"} variant="caption" color="neutral400">
                <>{label}</>
              </ZigTypography>
            )}
          </>
        ) : (
          <ZigTypography variant={"body2"} color={"neutral400"}>
            -
          </ZigTypography>
        )}
      </Box>
    </Tooltip>
  );
};

export default ChangeIndicator;
