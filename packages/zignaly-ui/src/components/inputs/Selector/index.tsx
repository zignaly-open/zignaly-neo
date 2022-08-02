// Dependencies
import * as React from "react";
import { ReactElement, useState, useRef, useCallback } from "react";
import { useClickAway } from "react-use";

// Styled Components
import {
  Layout,
  Item,
  ArrowContainer,
  Menu,
  Label,
  Value,
  Placeholder,
  LeftElement,
  ItemCaption,
  LeftElementIcon,
  Container,
  ItemContainer,
} from "./styles";

// Assets
import Arrow from "assets/icons/caret-down-icon.svg";

// Types
import { OptionItem, SelectProps, SelectSizes } from "./types";
import { dark } from "theme";
import Typography from "components/display/Typography";

function Select({
  name,
  mode,
  label,
  fullWidth,
  className,
  value = null,
  options = [],
  disabled = false,
  placeholder = "Button",
  onChange = () => {},
  size = SelectSizes.NORMAL,
  maxHeight,
  transparent,
  isMenuActive = false,
}: SelectProps): ReactElement {
  // Ref
  const selectorRef = useRef(null);

  // Hooks
  const [isActiveMenu, setMenuActive] = useState(isMenuActive);

  /**
   * @function handleClickItem():
   * @description Handle select change form component.
   */
  const handleClickItem = useCallback(
    (value: OptionItem, index: number) => {
      onChange({ ...value, index });
      setMenuActive(false);
    },
    [options],
  );

  useClickAway(selectorRef, () => {
    setMenuActive(false);
  });

  return (
    <Layout
      size={size}
      name={name}
      ref={selectorRef}
      disabled={disabled}
      className={className}
      fullWidth={fullWidth}
      isActiveMenu={isActiveMenu}
      collapsed={mode === "collapsed" && !isActiveMenu}
      maxHeight={maxHeight}
      transparent={transparent}
    >
      {label && (
        <Label htmlFor={name}>
          <Typography variant="inputl" color="neutral200">
            {label}
          </Typography>
        </Label>
      )}
      <Container onClick={() => setMenuActive(!isActiveMenu)}>
        {mode !== "collapsed" &&
          (value ? (
            <>
              {value.leftElement && (
                <LeftElement>
                  {typeof value.leftElement === "object" ? (
                    value.leftElement
                  ) : (
                    <LeftElementIcon src={value.leftElement} alt={value.caption} />
                  )}
                </LeftElement>
              )}
              <Value variant={"body1"} color="neutral100" weight="medium">
                {value.caption}
              </Value>
            </>
          ) : (
            <Placeholder variant="inputl">{placeholder}</Placeholder>
          ))}
        <ArrowContainer>
          <Arrow alt={label} width="28" height="28" color={dark.neutral300} />
        </ArrowContainer>
      </Container>{" "}
      <Menu>
        {!options.length ? (
          <Item empty={true}>
            <ItemCaption>No data available</ItemCaption>
          </Item>
        ) : (
          options.map((option: OptionItem, index: number) => {
            const isSelectedOption = !!(value === option);

            if (isSelectedOption) return null;

            return (
              <Item key={`--${index.toString()}`} onClick={() => handleClickItem(option, index)}>
                <ItemContainer>
                  {option.leftElement && (
                    <LeftElement>
                      {typeof option.leftElement === "object" ? (
                        option.leftElement
                      ) : (
                        <LeftElementIcon src={option.leftElement} alt={option.caption} />
                      )}
                    </LeftElement>
                  )}
                  <ItemCaption variant={"body1"} color="neutral100" weight="medium">
                    {option.caption}
                  </ItemCaption>
                </ItemContainer>
              </Item>
            );
          })
        )}
      </Menu>
    </Layout>
  );
}

export default Select;
