import * as React from "react";
import { ReactElement, useState, useRef, useMemo } from "react";
import { useClickAway } from "react-use";
import { Layout, Container, Value, ArrowContainer, ValueContainer } from "./styles";
import { ReactComponent as CaretDownIcon } from "assets/icons/caret-down-icon.svg";
import { TokenSelectorProps } from "./types";
import { Coin } from "../types";
import { ZigCoinIcon } from "../../../../index";
import ZigSelect from "../../ZigSelect";

function TokenSelector({
  value,
  tokens = [],
  onSelectToken = () => null,
}: TokenSelectorProps<any>): ReactElement {
  const selectorRef = useRef(null);
  const [isActiveMenu, setMenuActive] = useState(false);
  const coinVal = typeof value === "object" ? value.coin : value ?? "";

  useClickAway(selectorRef, () => {
    setMenuActive(false);
  });

  /**
   * @var tokensAvailable
   * @description Stored variable showing the available tokens (filters the selected token to avoid duplication).
   */
  const tokensAvailable = useMemo(
    () => tokens.filter((token) => token.value !== coinVal),
    [tokens, value],
  );
  console.log(tokensAvailable);
  return (
    <Layout isActiveMenu={isActiveMenu} ref={selectorRef}>
      <Container onClick={() => setMenuActive(!isActiveMenu)}>
        {value && (
          <ValueContainer>
            {coinVal && <ZigCoinIcon coin={coinVal} size={"small"} />}
            <Value>{coinVal.toUpperCase()}</Value>
          </ValueContainer>
        )}
        <ArrowContainer>
          <CaretDownIcon width={"20px"} height={"10px"} />
        </ArrowContainer>
      </Container>
      <ZigSelect
        onChange={(token: Coin) => {
          onSelectToken(token);
        }}
        options={tokensAvailable}
      />
      {/*<Menu>*/}
      {/*  {tokensAvailable.length &&*/}
      {/*    tokensAvailable.map((token: Coin, index) => (*/}
      {/*      <Item*/}
      {/*        key={`--${index.toString()}`}*/}
      {/*        onClick={() => {*/}
      {/*          onSelectToken(token);*/}
      {/*          setMenuActive(false);*/}
      {/*        }}*/}
      {/*      >*/}
      {/*        {token.coin && <ZigCoinIcon coin={token.coin} size={"small"} />}*/}
      {/*        <Value>{token.coin.toUpperCase()}</Value>*/}
      {/*      </Item>*/}
      {/*    ))}*/}
      {/*</Menu>*/}
    </Layout>
  );
}

export default TokenSelector;
