// Dependencies
import * as React from "react";
import { ReactElement, useState, useRef, useMemo } from "react";
import { useClickAway } from "react-use";

// Styled Components
import { Layout, Container, Value, ArrowContainer, ValueContainer, Menu, Item } from "./styles";

// Assets
import ArrowDown from "assets/icons/caret-down-icon.svg";

// Types
import { TokenSelectorProps } from "./types";
import { TokenItem } from "../../types";
import CoinIcon from "../../../../display/CoinIcon";

function TokenSelector({
  value,
  tokens = [],
  onSelectToken = () => {},
}: TokenSelectorProps): ReactElement {
  // Ref
  const selectorRef = useRef(null);

  // Hooks
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
            {value.id && <CoinIcon coin={value.id} size={"small"} name={value.id} />}
            <Value>{value.id.toUpperCase()}</Value>
          </ValueContainer>
        )}
        <ArrowContainer isActiveMenu={isActiveMenu}>
          <ArrowDown width={28} height={28} color="#89899A" alt={"Select a token"} />
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
              {token.id && <CoinIcon coin={token.id} size={"small"} name={token.id} />}
              <Value>{token.id.toUpperCase()}</Value>
            </Item>
          ))}
      </Menu>
    </Layout>
  );
}

export default TokenSelector;
