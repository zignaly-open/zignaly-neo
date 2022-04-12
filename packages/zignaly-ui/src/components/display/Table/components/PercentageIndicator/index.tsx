// Dependencies
import React from "react";
import NumberFormat from "react-number-format";

// Assets
import ArrowChartUpIcon from "../../../../../assets/icons/arrow-chart-up-icon.svg";
import ArrowChartDownIcon from "../../../../../assets/icons/arrow-chart-down-icon.svg";

// Styled Components
import * as styled from "./styles";

//  Utils
import { isPositive } from "utils/numbers";

const PercentageIndicator = ({ value = 0 }) => (
  <styled.Layout>
    <styled.Indicator src={isPositive(value) ? ArrowChartUpIcon : ArrowChartDownIcon} />
    <styled.Value isPositive={isPositive(value)}>
      <NumberFormat
        value={String(value).replaceAll("-", "")}
        displayType={"text"}
        thousandSeparator={true}
      />
      %
    </styled.Value>
  </styled.Layout>
);

export default PercentageIndicator;
