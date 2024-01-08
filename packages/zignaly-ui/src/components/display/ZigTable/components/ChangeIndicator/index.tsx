import React from "react";
import { NumericFormat } from "react-number-format";
import { useTheme } from "styled-components";
import BigNumber from "bignumber.js";
import { Layout, Row, Container, Indicator, Subtitle, Inline } from "./styles";
import { ValueIndicator } from "components/styled";
import { ChangeIndicatorProps } from "./types";
import { Tooltip } from "@mui/material";
import ZigTypography from "../../../ZigTypography";

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
}: ChangeIndicatorProps) => {
  let bigNumberValue = new BigNumber(value);
  if (normalized) bigNumberValue = bigNumberValue.multipliedBy(100);
  const isPositiveValue = bigNumberValue.isPositive();
  const theme: any = useTheme();

  const renderIndicator = () => {
    const isZero = bigNumberValue.isZero();
    const indicatorClassName = isZero ? "zero" : isPositiveValue ? "positive" : "negative";

    return (
      <Inline>
        <ValueIndicator
          variant={type === "graph" ? "body2" : "body1"}
          className={indicatorClassName}
        >
          <NumericFormat
            style={style}
            value={bigNumberValue.toFixed()}
            displayType={"text"}
            suffix={type === "only_number" ? "" : "%"}
            thousandSeparator={","}
            decimalScale={decimalScale}
            fixedDecimalScale={stableCoinOperative}
            id={id}
          />
        </ValueIndicator>
        {!isZero && type === "graph" && (
          <Indicator
            className={`${type} ${indicatorClassName}`}
            width="5"
            height="5"
            isPositive={isPositiveValue}
            color={
              isZero
                ? theme.palette.neutral300
                : isPositiveValue
                ? theme.palette.greenGraph
                : theme.palette.redGraphOrError
            }
          />
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
