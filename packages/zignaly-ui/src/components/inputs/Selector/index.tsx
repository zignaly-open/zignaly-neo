// Dependencies
import * as React from "react";
import { ReactElement, useState, useRef, useMemo, useCallback } from "react";
import { useClickAway } from "react-use";

// Styled Components
import * as styled from "./styles";

// Assets
import CaretDownIcon from "assets/icons/caret-down-icon.svg";

// Types
import { SelectProps, SelectSizes } from "./types";

function Select({
  size = SelectSizes.NORMAL,
  label,
  name,
  placeholder = "Button",
  disabled = false,
  initialSelectedIndex = null,
  options = [],
  onSelectItem = () => {},
}: SelectProps): ReactElement {
  // Ref
  const selectorRef = useRef(null);

  // Hooks
  const [isActiveMenu, setMenuActive] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(initialSelectedIndex);

  const selectedItem = useMemo(
    () => (selectedIndex ? options[selectedIndex - 1] : null),
    [selectedIndex],
  );

  const handleClickItem = useCallback(
    (index: number) => {
      setSelectedIndex(index);
      if (options) {
        onSelectItem(options[index - 1]);
      }
      setMenuActive(false);
    },
    [options],
  );

  useClickAway(selectorRef, () => {
    setMenuActive(false);
  });

  return (
    <styled.Layout size={size} isActiveMenu={isActiveMenu} disabled={disabled} ref={selectorRef}>
      {label && <styled.Label htmlFor={name}>{label}</styled.Label>}
      <styled.Container onClick={() => setMenuActive(!isActiveMenu)}>
        {selectedItem ? (
          <>
            {selectedItem.leftElement && (
              <styled.LeftElement>
                {typeof selectedItem.leftElement === "function" ? (
                  selectedItem.leftElement
                ) : (
                  <styled.LeftElementIcon
                    src={selectedItem.leftElement}
                    alt={selectedItem.caption}
                  />
                )}
              </styled.LeftElement>
            )}
            <styled.Value>{selectedItem.caption}</styled.Value>
          </>
        ) : (
          <styled.Placeholder>{placeholder}</styled.Placeholder>
        )}
        <styled.ArrowContainer>
          <styled.Arrow src={CaretDownIcon} alt={label} />
        </styled.ArrowContainer>
      </styled.Container>
      <styled.Menu>
        {!options.length ? (
          <styled.Item empty={true}>
            <styled.ItemCaption>No data available</styled.ItemCaption>
          </styled.Item>
        ) : (
          options.map(({ caption, leftElement = null }, index) => (
            <styled.Item key={`--${index.toString()}`} onClick={() => handleClickItem(index + 1)}>
              {leftElement && (
                <styled.LeftElement>
                  {typeof leftElement === "function" ? (
                    leftElement
                  ) : (
                    <styled.LeftElementIcon src={leftElement} alt={caption} />
                  )}
                </styled.LeftElement>
              )}
              <styled.ItemCaption>{caption}</styled.ItemCaption>
            </styled.Item>
          ))
        )}
      </styled.Menu>
    </styled.Layout>
  );
}

export default Select;
