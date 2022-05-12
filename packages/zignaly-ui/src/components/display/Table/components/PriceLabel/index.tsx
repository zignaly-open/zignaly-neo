// Dependencies
import React from "react";
import NumberFormat from "react-number-format";

// Styled Components
import * as styled from "./styles";

// Types
import { PriceLabelProps } from "./types";
import { BottomElementWrap } from "./styles";
import Typography from "components/display/Typography";

const PriceLabel = ({
  value = 0,
  coin = "USDT",
  fiat = false,
  symbol = "$",
  bottomElement = null,
}: PriceLabelProps) => (
  <styled.Layout fiat={fiat}>
    <styled.Value>
      <NumberFormat
        prefix={fiat ? symbol : ""}
        value={value}
        style={{ fontWeight: "500", fontSize: "15px" }}
        displayType={"text"}
        thousandSeparator={true}
        decimalScale={fiat ? 2 : undefined}
      />
      {!fiat && (
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

export default PriceLabel;
