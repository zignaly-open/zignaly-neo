// Dependencies
import * as React from "react";
import { ReactElement, useState, useRef, useCallback } from "react";
import { useClickAway } from "react-use";

// Styled Components
import * as styled from "./styles";

// Assets
import CaretDownIcon from "assets/icons/caret-down-icon.svg?url";

// Types
import { OptionItem, SelectProps, SelectSizes } from "./types";

function Select({
  name,
  mode,
  label,
  className,
  value = null,
  options = [],
  disabled = false,
  placeholder = "Button",
  onChange = () => {},
  size = SelectSizes.NORMAL,
  fullWidth,
}: SelectProps): ReactElement {
  // Ref
  const selectorRef = useRef(null);

  // Hooks
  const [isActiveMenu, setMenuActive] = useState(false);

  const handleClickItem = useCallback(
    (value: OptionItem) => {
      onChange(value);
      setMenuActive(false);
    },
    [options],
  );

  useClickAway(selectorRef, () => {
    setMenuActive(false);
  });

  return (
    <styled.Layout
      className={className}
      size={size}
      isActiveMenu={isActiveMenu}
      disabled={disabled}
      ref={selectorRef}
      collapsed={mode === "collapsed" && !isActiveMenu}
      fullWidth={fullWidth}
      name={name}
    >
      {label && <styled.Label htmlFor={name}>{label}</styled.Label>}
      <styled.Container onClick={() => setMenuActive(!isActiveMenu)}>
        {mode !== "collapsed" &&
          (value ? (
            <>
              {value.leftElement && (
                <styled.LeftElement>
                  {typeof value.leftElement === "object" ? (
                    value.leftElement
                  ) : (
                    <styled.LeftElementIcon src={value.leftElement} alt={value.caption} />
                  )}
                </styled.LeftElement>
              )}
              <styled.Value>{value.caption}</styled.Value>
            </>
          ) : (
            <styled.Placeholder>{placeholder}</styled.Placeholder>
          ))}
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
          options.map((option: OptionItem, index) => (
            <styled.Item key={`--${index.toString()}`} onClick={() => handleClickItem(option)}>
              {option.leftElement && (
                <styled.LeftElement>
                  {typeof option.leftElement === "object" ? (
                    option.leftElement
                  ) : (
                    <styled.LeftElementIcon src={option.leftElement} alt={option.caption} />
                  )}
                </styled.LeftElement>
              )}
              <styled.ItemCaption>{option.caption}</styled.ItemCaption>
            </styled.Item>
          ))
        )}
      </styled.Menu>
    </styled.Layout>
  );
}

export default Select;
