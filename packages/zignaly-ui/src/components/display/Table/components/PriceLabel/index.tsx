// Dependencies
import React from "react";
import NumberFormat from "react-number-format";

// Styled Components
import * as styled from "./styles";

// Types
import { PriceLabelProps } from "./types";
import { BottomElementWrap } from "./styles";
import Typography from "components/display/Typography";
import { useTheme } from "styled-components";
import Theme from "../../../../../theme/theme";

const PriceLabel = ({
  value = 0,
  coin = "USDT",
  symbol = "$",
  bottomElement = null,
  // TODO: this is utter bs we should not compute such things outside
  stableCoinOperative = false,
  green,
  red,
  className,
}: PriceLabelProps) => {
  const theme = useTheme() as Theme;
  return (
    <styled.Layout fiat={stableCoinOperative} className={className}>
      <styled.Value>
        <NumberFormat
          prefix={stableCoinOperative ? symbol : ""}
          value={value}
          style={{
            fontWeight: "500",
            fontSize: "15px",
            lineHeight: "24px",
            color: green ? theme.greenGraph : red ? theme.redGraphOrError : theme.neutral300,
          }}
          displayType={"text"}
          thousandSeparator={true}
          decimalScale={stableCoinOperative ? 2 : undefined}
        />
        {!stableCoinOperative && (
          <styled.Coin weight="medium" variant={"body2"} color={"neutral400"}>
            {coin}
          </styled.Coin>
        )}
      </styled.Value>
      {bottomElement && (
        <BottomElementWrap>
          <Typography variant="body1">{bottomElement}</Typography>
        </BottomElementWrap>
      )}
    </styled.Layout>
  );
};

export default PriceLabel;
