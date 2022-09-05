import React, { useCallback, useMemo, useRef, useState } from "react";
import { useTheme } from "styled-components";
import { useSpring } from "react-spring";
import { useClickAway } from "react-use";
import {
  Layout,
  Button,
  Icon,
  Label,
  Menu,
  List,
  Item,
  Indicator,
  Caption,
  SearchInput,
  Empty,
  InputIcon,
} from "./styles";
import Typography from "../../../components/display/Typography";
import { ReactComponent as ArrowIcon } from "../../../assets/icons/caret-down-icon.svg";
import { ReactComponent as SearchIcon } from "../../../assets/icons/search-icon.svg";
import { SelectorItemFormat, SelectProps, SelectSizes } from "./types";
import _ from "lodash";

/**
 * @function formatSelectorItem
 * @param id Unique identification of the select data.
 * @param icon Icon element (Optional)
 * @param caption Caption text for selector
 * @param data Data to parse.
 */
export const formatInputSelectItem = (
  { id, icon = null, caption }: any,
  data: any,
): SelectorItemFormat => ({
  ref: {
    id,
    icon,
    caption,
  },
  data,
});

function InputSelect({
  name,
  label = null,
  options = [],
  selected = null,
  disabled = false,
  variant = "primary",
  size = SelectSizes.NORMAL,
  onSelectItem = () => null,
  placeholder = "Choose a option",
}: SelectProps) {
  const theme: any = useTheme();
  const layoutRef = useRef<HTMLElement>(null);
  const inputRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);
  const [showingCount, setShowingCount] = useState(10);
  const [isSelected, setSelected] = useState(selected);
  const [searchText, setSearchText] = useState(selected ? selected.ref.caption : "");
  const [menuStyle, menuAPI] = useSpring<React.CSSProperties>(() => ({
    opacity: 0,
    transform: "scale(0.98)",
    config: {
      duration: 100,
    },
  }));

  /**
   * @name handlePressButton():
   * @description Handle when the user click on the selector button activator.
   */
  const handlePressButton = useCallback(() => {
    if (disabled) return;

    if (active) {
      menuAPI.start({
        opacity: 0,
        transform: "scale(0.98)",
        onRest: () => {
          setActive(false);
          setShowingCount(10);
        },
      });
    } else {
      if (inputRef && inputRef.current) {
        inputRef.current.focus();
      }
      setActive(true);
      menuAPI.start({
        opacity: 1,
        transform: "scale(1)",
      });
    }
  }, [inputRef, active, disabled]);

  /**
   * @name handlePressOption():
   * @description Handle when the user select an option of the list.
   */
  const handlePressOption = useCallback((option) => {
    setSelected(option);
    setSearchText(option.ref.caption);
    onSelectItem(option);

    menuAPI.start({
      opacity: 0,
      transform: "scale(0.98)",
      onRest: () => {
        setActive(false);
        setShowingCount(10);
      },
    });
  }, []);

  /**
   * @name useClickAway():
   * @description Handle when the user click outside the selector layout.
   */
  useClickAway(layoutRef, () => {
    if (active) {
      menuAPI.start({
        opacity: 0,
        transform: "scale(0.98)",
        onRest: () => {
          setActive(false);
          setShowingCount(10);
        },
      });
    }
  });

  /**
   * @name currentOptions():
   * @description Memorized variables to options of the selector.
   */
  const currentOptions = useMemo(() => {
    let newOptions = options;
    if (!searchText.trim().length || isSelected) {
      newOptions = newOptions.slice(0, showingCount);
    }
    if (!searchText || searchText === "") return newOptions;

    if (isSelected) {
      return newOptions;
    }

    return _.filter(
      newOptions,
      (option) => option.ref.caption.toLowerCase().indexOf(searchText.toLowerCase()) > -1,
    );
  }, [options, isSelected, showingCount, searchText]);

  /**
   * @name onDetectScrollDown():
   * @description Invokes when the user scroll-down the menu.
   */
  const onDetectScrollDown = useCallback((e: any) => {
    const { scrollTop, scrollHeight, childElementCount } = e.target;
    if (scrollTop > scrollHeight - 200) {
      if (childElementCount !== options?.length - 1) {
        setShowingCount((currentCount) => currentCount + 10);
      }
    }
  }, []);

  return (
    <Layout ref={layoutRef} disabled={disabled} variant={variant} size={size}>
      {label && (
        <Label htmlFor={name}>
          <Typography variant="h3" weight="regular" color="neutral200">
            {label}
          </Typography>
        </Label>
      )}
      <Button onClick={handlePressButton}>
        <Caption>
          {isSelected && selected && selected.ref.icon ? (
            <InputIcon>{selected.ref.icon}</InputIcon>
          ) : (
            <InputIcon>
              <SearchIcon width={"16px"} height={"16px"} color={theme.neutral300} />
            </InputIcon>
          )}
          <SearchInput
            ref={inputRef}
            placeholder={placeholder}
            value={searchText}
            onChange={({ target: { value } }: { target: HTMLInputElement }) => {
              setSearchText(value);
              setSelected(null);
              onSelectItem(null);
            }}
          />
        </Caption>
        <Indicator>
          <ArrowIcon width={12} height={12} color={theme.neutral300} />
        </Indicator>
      </Button>
      {active && (
        <Menu style={menuStyle}>
          {!currentOptions.length ? (
            <Empty>
              <Typography variant="body1" color="neutral400">
                {!searchText.trim().length ? "No data available" : "There are no coincidences"}
              </Typography>
            </Empty>
          ) : (
            <List onScroll={onDetectScrollDown}>
              {currentOptions.map((option, index) => (
                <Item
                  onClick={() => handlePressOption(option)}
                  key={`--option-index-${index.toString()}`}
                >
                  <Caption>
                    {option.ref.icon && <Icon>{option.ref.icon}</Icon>}
                    <Typography variant={"body1"} color="neutral100" weight="medium">
                      {option.ref.caption}
                    </Typography>
                  </Caption>
                </Item>
              ))}
            </List>
          )}
        </Menu>
      )}
    </Layout>
  );
}

export default InputSelect;
