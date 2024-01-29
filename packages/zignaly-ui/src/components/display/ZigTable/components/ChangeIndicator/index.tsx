import React from "react";
import { NumericFormat } from "react-number-format";
import { useTheme } from "styled-components";
import BigNumber from "bignumber.js";
import { Layout, Row, Container, Indicator, Subtitle, Inline, ValueIndicator } from "./styles";
import { ChangeIndicatorProps } from "./types";
import { Tooltip } from "@mui/material";
import ZigTypography from "../../../ZigTypography";
import { isNil } from "lodash-es";

// Fix 1 decimal issue making 1.95 until 1.99 to be 2.0 instead of 2
// https://github.com/s-yadav/react-number-format/issues/820
const adjustDecimals = (value: BigNumber, decimals: number) => {
  const decimalPart = value.abs().mod(1);

  if (decimals == 1 && decimalPart.gt(0.95)) return 0;

  return decimals;
};

// Fix -0.01 until -0.05 to be -0.0 instead of 0
// Also remove negative sign when hideNegativeSign is true, used when showing the indicator arrow instead
const adjustNumber = (value: BigNumber, decimals: number, hideNegativeSign?: boolean) => {
  if (hideNegativeSign) return value.abs();
  if (decimals === 1 && value.lt(0) && value.gte(-0.05)) return 0;
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
  hideNegativeSign = false,
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
      <Inline>
        <ValueIndicator
          variant={type === "graph" ? "body2" : "body1"}
          color={color}
          smallPct={smallPct && type !== "only_number" && !isNil(value)}
        >
          <NumericFormat
            style={style}
            value={adjustNumber(bigNumberValue, decimalScale, hideNegativeSign).toFixed()}
            displayType={"text"}
            suffix={type === "only_number" || smallPct ? "" : "%"}
            thousandSeparator={","}
            decimalScale={adjustDecimals(bigNumberValue, decimalScale)}
            fixedDecimalScale={stableCoinOperative}
            id={id}
          />
        </ValueIndicator>
        {!isZero && type === "graph" && (
          <Indicator width="5" height="5" isPositive={isPositiveValue} color={color} />
        )}
      </Inline>
    );
  };

  return (
    <Layout>
      <Container>
        <Tooltip title={labelTooltip}>
          <Row>
            {!isNaN(+value) ? (
              <>
                {renderIndicator()}
                {label && (
                  <Subtitle variant="caption" color="neutral400">
                    <>{label}</>
                  </Subtitle>
                )}
              </>
            ) : (
              <ZigTypography variant={"body2"} color={"neutral400"}>
                -
              </ZigTypography>
            )}
          </Row>
        </Tooltip>
      </Container>
    </Layout>
  );
};

export default ChangeIndicator;
