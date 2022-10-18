import React from "react";
import NumberFormat from "react-number-format";

import * as styled from "./styles";

import { PriceLabelProps, UsdPriceLabelProps } from "./types";
import { BottomElementWrap } from "./styles";
import Typography from "components/display/Typography";
import { useTheme } from "styled-components";
import Theme from "../../../../../theme/theme";
import { getPrecisionForCoin } from "./util";

const PriceLabel = ({
  value = 0,
  coin = "USDT",
  bottomElement = null,
  suffixElement = null,
  hideCoinName = false,
  green,
  precision,
  valuePrefix,
  red,
  className,
}: PriceLabelProps) => {
  const theme = useTheme() as Theme;
  return (
    <styled.Layout className={className}>
      <styled.Value>
        <NumberFormat
          prefix={valuePrefix || ""}
          value={value}
          style={{
            fontWeight: "500",
            fontSize: "15px",
            lineHeight: "24px",
            color: green ? theme.greenGraph : red ? theme.redGraphOrError : theme.neutral300,
          }}
          displayType={"text"}
          thousandSeparator={true}
          decimalScale={precision || getPrecisionForCoin(coin, value)}
        />
        {!hideCoinName && (
          <styled.Coin weight="medium" variant={"body2"} color={"neutral400"}>
            {coin}
          </styled.Coin>
        )}
        {suffixElement}
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

export const UsdPriceLabel: React.FC<UsdPriceLabelProps> = ({ value, green, red }) => (
  <PriceLabel
    value={value}
    green={green}
    red={red}
    precision={2}
    valuePrefix={"$"}
    hideCoinName
    coin={""}
  />
);
