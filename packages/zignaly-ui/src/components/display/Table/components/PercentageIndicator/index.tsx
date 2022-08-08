// Dependencies
import React from "react";
import NumberFormat from "react-number-format";
import { useTheme } from "styled-components";

// Styled Components
import * as styled from "./styles";

//  Utils
import { isPositive } from "utils/numbers";
import { PercentageIndicatorProps } from "./types";
import { ReactComponent as Trophy } from "assets/icons/trophy-icon.svg";
import { Gap } from "utils/gap";

const PercentageIndicator = ({
  value = 0,
  subtitle = "",
  dashboardType = "investor",
  showTrophy,
}: PercentageIndicatorProps) => {
  const isPositiveValue = isPositive(value);
  const theme: any = useTheme();

  return (
    <styled.Layout>
      <styled.Container>
        <styled.Row>
          {dashboardType === "investor" && (
            <styled.Indicator
              width="5"
              height="5"
              isPositive={isPositiveValue}
              color={isPositiveValue ? theme.greenGraph : theme.redGraphOrError}
            />
          )}
          <styled.Value
            variant={dashboardType === "investor" ? "h5" : "body1"}
            isPositive={isPositiveValue}
          >
            <NumberFormat
              value={
                dashboardType === "investor" ? String(value).replaceAll("-", "") : String(value)
              }
              displayType={"text"}
              thousandSeparator={true}
            />
            %
          </styled.Value>
          {showTrophy && (
            <styled.TropyContainer>
              <Trophy width={24} height={24}></Trophy>
              <Gap gap={2}></Gap>
            </styled.TropyContainer>
          )}
        </styled.Row>
        {dashboardType !== "investor" && (
          <styled.Subtitle variant="body2" color="neutral400">
            {subtitle}
          </styled.Subtitle>
        )}
      </styled.Container>
    </styled.Layout>
  );
};

export default PercentageIndicator;
