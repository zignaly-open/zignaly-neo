import React from "react";
import { NumericFormat } from "react-number-format";

import * as styled from "./styles";

import { PriceLabelProps, UsdPriceLabelProps } from "./types";
import { BottomElementWrap } from "./styles";
import { useTheme } from "styled-components";
import Theme from "../../../../../theme/theme";
import { getPrecisionForCoin } from "../../../ZigPriceLabel/util";
import ZigTypography from "../../../ZigTypography";

/**
 * @deprecated
 */
const PriceLabel = ({
  value = 0,
  coin = "USDT",
  bottomElement = null,
  suffixElement = null,
  hideCoinName = false,
  green,
  style,
  precision,
  valuePrefix,
  red,
  className,
}: PriceLabelProps) => {
  const theme = useTheme() as Theme;
  return (
    <styled.Layout className={className}>
      <styled.Value>
        <NumericFormat
          prefix={valuePrefix || ""}
          value={value}
          style={{
            fontWeight: "500",
            fontSize: "15px",
            lineHeight: "24px",
            color: green ? theme.greenGraph : red ? theme.redGraphOrError : theme.neutral300,
            ...style, // TODO: should use variants and not styles
          }}
          displayType={"text"}
          thousandSeparator={true}
          decimalScale={precision || getPrecisionForCoin(coin, value)}
        />
        {!hideCoinName && (
          <styled.Coin fontWeight="medium" variant={"body2"} color={"neutral400"}>
            {coin}
          </styled.Coin>
        )}
        {suffixElement}
      </styled.Value>

      {bottomElement && (
        <BottomElementWrap>
          <ZigTypography variant="body1">{bottomElement}</ZigTypography>
        </BottomElementWrap>
      )}
    </styled.Layout>
  );
};

export default PriceLabel;

export const UsdPriceLabel: React.FC<UsdPriceLabelProps> = ({ style, value, green, red }) => (
  <PriceLabel
    value={value}
    green={green}
    red={red}
    precision={2}
    valuePrefix={"$"}
    hideCoinName
    style={style}
    coin={""}
  />
);
