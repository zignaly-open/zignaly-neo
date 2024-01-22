import React from "react";
import { NumericFormat } from "react-number-format";
import { useTheme } from "styled-components";
import BigNumber from "bignumber.js";
import { Layout, Row, Container, Indicator, Subtitle, Inline, ValueIndicator } from "./styles";
import { ChangeIndicatorProps } from "./types";
import { Tooltip } from "@mui/material";
import ZigTypography from "../../../ZigTypography";

// Fix 1 decimal issue making 1.95 to be 2.0
// https://github.com/s-yadav/react-number-format/issues/820
const checkDecimals = (value: number, decimals: number) => {
  const decimalPart = value % 1;
  return decimals === 1 && decimalPart > 0.95 ? 0 : decimals;
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
          smallPct={smallPct && type !== "only_number"}
        >
          <NumericFormat
            style={style}
            value={bigNumberValue.toFixed()}
            displayType={"text"}
            suffix={type === "only_number" || smallPct ? "" : "%"}
            thousandSeparator={","}
            decimalScale={checkDecimals(+bigNumberValue, decimalScale)}
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
