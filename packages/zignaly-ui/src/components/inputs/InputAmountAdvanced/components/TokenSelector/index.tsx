import * as React from "react";
import { ReactElement, useState, useRef, useMemo } from "react";
import { useClickAway } from "react-use";
import { Layout, Container, Value, ArrowContainer, ValueContainer, Menu, Item } from "./styles";
import CoinIcon from "components/display/CoinIcon";
import { ReactComponent as CaretDownIcon } from "../../../../../assets/icons/caret-down-icon.svg";
import { TokenSelectorProps } from "./types";
import { TokenItem } from "../../types";

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
            {value.id && <CoinIcon coin={value.id} size={"small"} name={value.id} />}
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
              {token.id && <CoinIcon coin={token.id} size={"small"} name={token.id} />}
              <Value>{token.id.toUpperCase()}</Value>
            </Item>
          ))}
      </Menu>
    </Layout>
  );
}

export default TokenSelector;
