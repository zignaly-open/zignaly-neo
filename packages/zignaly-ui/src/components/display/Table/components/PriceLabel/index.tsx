// Dependencies
import React from "react";
import NumberFormat from "react-number-format";

// Styled Components
import * as styled from "./styles";

// Types
import { PriceLabelProps } from "./types";
import { BottomElementWrap } from "./styles";

const PriceLabel = ({
  value = 0,
  coin = "USDT",
  fiat = false,
  symbol = "$",
  bottomElement = null,
}: PriceLabelProps) => (
  <styled.Layout fiat={fiat}>
    <styled.Value variant={"h3"} color={"neutral100"}>
      <NumberFormat
        prefix={fiat ? symbol : ""}
        value={value}
        displayType={"text"}
        thousandSeparator={true}
        decimalScale={fiat ? 2 : undefined}
      />
      {!fiat && (
        <styled.Coin variant={"body2"} color={"neutral400"}>
          {coin}
        </styled.Coin>
      )}
    </styled.Value>
    {bottomElement && <BottomElementWrap>{bottomElement}</BottomElementWrap>}
  </styled.Layout>
);

export default PriceLabel;
