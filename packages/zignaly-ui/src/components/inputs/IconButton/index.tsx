// Dependencies
import React, { useCallback, useMemo, useEffect, useRef, useState } from "react";
import { useClickAway, useWindowSize } from "react-use";
import { Portal } from "react-portal";

// Styled Components
import { Layout, ViewPort, Dropdown, Icon, Container } from "./styles";

// Types
import { IconButtonProps, defaultDropDownOptions } from "./types";

const IconButton = ({
  icon,
  disabled = false,
  size = "medium",
  variant = "primary",
  onClick = null,
  dropDownOptions,
  renderDropDown = null,
}: IconButtonProps) => {
  // Ref
  const options = {
    ...defaultDropDownOptions,
    ...dropDownOptions,
  };

  const layoutRef = useRef(null);
  const dropdownRef = useRef(null);

  // Hooks
  const { width } = useWindowSize();
  const [isActiveDropdown, setDropdownActive] = useState(false);

  /**
   * @function handleClickButton:
   * @description Function in charge of indicating the logic when pressing the button.
   */
  const handleClickButton = useCallback(() => {
    setDropdownActive((current) => !current);
  }, []);

  useClickAway(layoutRef, (event: Event) => {
    if (event && event.target && dropdownRef) {
      const container = dropdownRef.current as unknown as HTMLElement;

      if (container && !container.contains(event.target as Node) && isActiveDropdown) {
        handleClickButton();
      }
    }
  });

  useEffect(() => {
    if (layoutRef && layoutRef.current && options.position === "absolute") {
      if (isActiveDropdown) {
        const { offsetTop, clientHeight, offsetLeft, clientWidth } = layoutRef.current;

        if (dropdownRef && dropdownRef.current) {
          const container = dropdownRef.current as HTMLElement;

          const { alignment, componentOverflowRef } = options;
          container.style.top = `${offsetTop + clientHeight}px`;

          const scrollLeft = componentOverflowRef ? componentOverflowRef.current.scrollLeft : 0;

          if (alignment === "right") {
            container.style.left = `${
              offsetLeft - (container.clientWidth - clientWidth) - scrollLeft
            }px`;
          } else {
            container.style.left = `${offsetLeft - scrollLeft}px`;
          }
          container.style.opacity = "1";
        }
      } else {
        if (dropdownRef && dropdownRef.current) {
          setDropdownActive(true);
        }
      }
    }
  }, [width, options.position, isActiveDropdown, options.componentOverflowRef]);

  useEffect(() => {
    if (isActiveDropdown) {
      setDropdownActive(false);
    }
  }, [width]);

  const renderDropDownBase = useMemo(
    () => (
      <Dropdown
        ref={dropdownRef}
        width={options.width}
        alignment={options.alignment}
        position={options.position}
        zIndex={options.zIndex}
      >
        {renderDropDown}
      </Dropdown>
    ),
    [dropdownRef, options],
  );

  return (
    <Layout ref={layoutRef}>
      <ViewPort
        size={size}
        variant={variant}
        disabled={disabled}
        isActiveDropdown={isActiveDropdown}
      >
        <Container onClick={disabled ? null : renderDropDown ? handleClickButton : onClick}>
          <Icon src={icon} />
        </Container>
      </ViewPort>
      {isActiveDropdown &&
        (options.position === "absolute" ? (
          <Portal>{renderDropDownBase}</Portal>
        ) : (
          renderDropDownBase
        ))}
    </Layout>
  );
};

export default IconButton;
