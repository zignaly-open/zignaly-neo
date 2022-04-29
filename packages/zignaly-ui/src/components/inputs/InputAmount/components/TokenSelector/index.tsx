// Dependencies
import * as React from "react";
import { ReactElement, useState, useRef, useMemo } from "react";
import { useClickAway } from "react-use";

// Styled Components
import {
  Layout,
  Container,
  Image,
  Value,
  ArrowContainer,
  ValueContainer,
  Arrow,
  Menu,
  Item,
} from "./styles";

// Assets
import CaretDownIcon from "assets/icons/caret-down-icon.svg?url";

// Types
import { TokenSelectorProps } from "./types";
import { TokenItem } from "../../types";

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
            {value.image && <Image src={value.image} alt={value.name} />}
            <Value>{value.name}</Value>
          </ValueContainer>
        )}
        <ArrowContainer>
          <Arrow src={CaretDownIcon} alt={"Select a token"} />
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
              {token.image && <Image src={token.image} alt={token.name} />}
              <Value>{token.name}</Value>
            </Item>
          ))}
      </Menu>
    </Layout>
  );
}

export default TokenSelector;
