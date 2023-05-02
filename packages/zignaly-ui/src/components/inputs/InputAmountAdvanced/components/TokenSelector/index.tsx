import * as React from "react";
import { ReactElement, useState, useRef, useMemo } from "react";
import { useClickAway } from "react-use";
import { Layout, Container, Value, ArrowContainer, ValueContainer, Menu, Item } from "./styles";
import { ReactComponent as CaretDownIcon } from "assets/icons/caret-down-icon.svg";
import { TokenSelectorProps } from "./types";
import { TokenItem } from "../../types";
import { ZigCoinIcon } from "../../../../../index";

function TokenSelector({
  value,
  tokens = [],
  onSelectToken = () => null,
}: TokenSelectorProps): ReactElement {
  const selectorRef = useRef(null);
  const [isActiveMenu, setMenuActive] = useState(false);

  useClickAway(selectorRef, () => {
    setMenuActive(false);
  });

  /**
   * @var tokensAvailable
   * @description Stored variable showing the available tokens (filters the selected token to avoid duplication).
   */
  const tokensAvailable = useMemo(
    () => tokens.filter((token) => token.id !== value.id),
    [tokens, value],
  );

  return (
    <Layout isActiveMenu={isActiveMenu} ref={selectorRef}>
      <Container onClick={() => setMenuActive(!isActiveMenu)}>
        {value && (
          <ValueContainer>
            {value.id && <ZigCoinIcon coin={value.id} size={"small"} />}
            <Value>{value.id.toUpperCase()}</Value>
          </ValueContainer>
        )}
        <ArrowContainer>
          <CaretDownIcon width={"20px"} height={"10px"} />
        </ArrowContainer>
      </Container>
      <Menu>
        {tokensAvailable.length &&
          tokensAvailable.map((token: TokenItem, index) => (
            <Item
              key={`--${index.toString()}`}
              onClick={() => {
                onSelectToken(token);
                setMenuActive(false);
              }}
            >
              {token.id && <ZigCoinIcon coin={token.id} size={"small"} />}
              <Value>{token.id.toUpperCase()}</Value>
            </Item>
          ))}
      </Menu>
    </Layout>
  );
}

export default TokenSelector;
