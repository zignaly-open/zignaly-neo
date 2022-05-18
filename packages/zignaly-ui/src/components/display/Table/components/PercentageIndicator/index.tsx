// Dependencies
import React from "react";
import NumberFormat from "react-number-format";

// Styled Components
import * as styled from "./styles";

//  Utils
import { isPositive } from "utils/numbers";
import { PercentageIndicatorProps } from "./types";

const PercentageIndicator = ({
  value = 0,
  subtitle = "",
  theme,
  dashboardType = "investor",
}: PercentageIndicatorProps) => {
  const isPositiveValue = isPositive(value);
  return (
    <styled.Layout>
      <styled.Container>
        <div>
          {dashboardType === "investor" && (
            <styled.Indicator
              width="5"
              height="5"
              isPositive={isPositiveValue}
              color={isPositiveValue ? theme["greenGraph"] : theme["redGraphOrError"]}
            />
          )}
          <styled.Value
            variant={dashboardType === "investor" ? "h5" : "body1"}
            isPositive={isPositiveValue}
          >
            <NumberFormat
              value={String(value).replaceAll("-", "")}
              displayType={"text"}
              thousandSeparator={true}
            />
            %
          </styled.Value>
        </div>
        {dashboardType === "user" && (
          <styled.Subtitle variant="body2" color="neutral400">
            {subtitle}
          </styled.Subtitle>
        )}
      </styled.Container>
    </styled.Layout>
  );
};

export default PercentageIndicator;
