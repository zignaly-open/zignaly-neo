// Dependencies
import React from "react";
import NumberFormat from "react-number-format";

// Styled Components
import * as styled from "./styles";

//  Utils
import { isPositive } from "utils/numbers";
import { PercentageIndicatorProps } from "./types";

const PercentageIndicator = ({ value = 0, theme }: PercentageIndicatorProps) => {
  const isPositiveValue = isPositive(value);
  return (
  <styled.Layout>
    <styled.Indicator width="5" height="5" isPositive={isPositiveValue} color={isPositiveValue ? theme["greenGraph"] : theme["redGraphOrError"]} />
    <styled.Value variant="h5" isPositive={isPositiveValue}>
      <NumberFormat
        value={String(value).replaceAll("-", "")}
        displayType={"text"}
        thousandSeparator={true}
      />
      %
    </styled.Value>
  </styled.Layout>
);};

export default PercentageIndicator;
