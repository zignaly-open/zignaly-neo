import React from "react";
import { NumericFormat } from "react-number-format";
import { useTheme } from "styled-components";
import BigNumber from "bignumber.js";
import { Layout, Row, Container, Indicator, Subtitle, Inline } from "./styles";
import { ValueIndicator } from "components/styled";
import { PercentageIndicatorProps } from "./types";
import Typography from "components/display/Typography";

const PercentageIndicator = ({
  value = "0",
  label,
  type = "graph",
  normalized = false,
  stableCoinOperative = false,
  style,
}: PercentageIndicatorProps) => {
  let bigNumberValue = new BigNumber(value);
  if (normalized) bigNumberValue = bigNumberValue.multipliedBy(100);
  const isPositiveValue = bigNumberValue.isPositive();
  const theme: any = useTheme();

  const renderIndicator = () => {
    const isZero = bigNumberValue.isZero();
    const indicatorClassName = isZero ? "zero" : isPositiveValue ? "positive" : "negative";

    switch (type) {
      case "graph": {
        return (
          <Inline>
            <ValueIndicator variant={"body2"} className={indicatorClassName}>
              <NumericFormat
                style={style}
                value={bigNumberValue.toFixed()}
                displayType={"text"}
                suffix={"%"}
                decimalScale={2}
                thousandSeparator={","}
              />
            </ValueIndicator>
            {!isZero && (
              <Indicator
                className={`${type} ${indicatorClassName}`}
                width="5"
                height="5"
                isPositive={isPositiveValue}
                color={
                  isZero
                    ? theme.neutral300
                    : isPositiveValue
                    ? theme.greenGraph
                    : theme.redGraphOrError
                }
              />
            )}
          </Inline>
        );
      }

      case "only_number":
        return (
          <Inline>
            <ValueIndicator variant={"body1"} className={indicatorClassName}>
              <NumericFormat
                style={style}
                value={bigNumberValue.toFixed()}
                displayType={"text"}
                thousandSeparator={","}
                decimalScale={stableCoinOperative ? 2 : 8}
                fixedDecimalScale={stableCoinOperative}
              />
            </ValueIndicator>
          </Inline>
        );

      default: {
        return (
          <Inline>
            <ValueIndicator variant={"body1"} className={indicatorClassName}>
              <NumericFormat
                style={style}
                value={bigNumberValue.toFixed()}
                displayType={"text"}
                suffix={"%"}
                thousandSeparator={","}
                decimalScale={stableCoinOperative ? 2 : 8}
                fixedDecimalScale={stableCoinOperative}
              />
            </ValueIndicator>
          </Inline>
        );
      }
    }
  };

  return (
    <Layout>
      <Container>
        <Row>
          {!isNaN(+value) ? (
            <>
              {renderIndicator()}
              {label && (
                <Subtitle variant="h5" color="neutral400">
                  {label}
                </Subtitle>
              )}
            </>
          ) : (
            <Typography variant={"body2"} color={"neutral400"}>
              -
            </Typography>
          )}
        </Row>
      </Container>
    </Layout>
  );
};

export default PercentageIndicator;
