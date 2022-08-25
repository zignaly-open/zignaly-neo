// Dependencies
import React, { useCallback, useRef, useState, useImperativeHandle, useEffect } from "react";
import { useClickAway } from "react-use";

// Styled Components
import { Layout, ViewPort, Dropdown, Icon, Container, ButtonLoader, IconContainer } from "./styles";
import Portal from "./components/Portal";

// Types
import { IconButtonProps, defaultDropDownOptions } from "./types";
import { LoaderTypes } from "components/display/Loader";

const IconButton = (
  {
    shrinkWrap,
    icon,
    disabled = false,
    size = "medium",
    variant = "primary",
    onClick = null,
    loading = false,
    dropDownOptions,
    renderDropDown = null,
    colors = {
      normal: "#706f82",
      active: "#fff",
    },
    className,
    type,
  }: IconButtonProps,
  innerRef: any,
) => {
  // Ref
  const options = {
    ...defaultDropDownOptions,
    ...dropDownOptions,
  };

  const requestAniRef = useRef<any>();

  const btnRef = useRef(null);
  const dropdownRef = useRef(null);

  // State
  const [isActiveDropdown, setDropdownActive] = useState(false);
  const [coords, setCoords] = useState({});

  useClickAway(btnRef, (event: Event) => {
    if (event && event.target && dropdownRef) {
      const container = dropdownRef.current as unknown as HTMLElement;

      if (container && !container.contains(event.target as Node) && isActiveDropdown) {
        handleClickButton();
      }
    }
  });

  useImperativeHandle(innerRef, () => ({
    setIsDropDownActive: (isActive: boolean) => {
      setDropdownActive(isActive);
    },
  }));

  const updateDropdownCoords = () => {
    if (btnRef && btnRef.current) {
      const button = btnRef.current as HTMLElement;
      const dropdown = dropdownRef.current as unknown as HTMLElement;

      if (button && dropdown) {
        const btnRect = button.getBoundingClientRect();
        const dropdownRect = dropdown.getBoundingClientRect();

        const top = btnRect.height + btnRect.y + window.scrollY;
        let left = 0;

        if (options.alignment === "right") {
          left = btnRect.x - dropdownRect.width + btnRect.width;
        } else {
          left = btnRect.x;
        }

        setCoords({
          left,
          top,
          opacity: 1,
        });
        requestAniRef.current = requestAnimationFrame(updateDropdownCoords);
      }
    }
  };

  useEffect(() => {
    if (isActiveDropdown) {
      requestAniRef.current = requestAnimationFrame(updateDropdownCoords);
    } else {
      setCoords({
        opacity: 0,
      });
      cancelAnimationFrame(requestAniRef.current);
    }
  }, [isActiveDropdown]);

  /**
   * @function handleClickButton:
   * @description Function in charge of indicating the logic when pressing the button.
   */
  const handleClickButton = useCallback(() => {
    setDropdownActive((current) => !current);
  }, [btnRef, dropdownRef]);

  return (
    <Layout className={className}>
      <ViewPort
        shrinkWrap={shrinkWrap}
        type={type}
        size={size}
        variant={variant}
        colors={colors}
        disabled={disabled || loading}
        ref={btnRef}
        isActiveDropdown={isActiveDropdown}
      >
        <Container onClick={disabled ? null : renderDropDown ? handleClickButton : onClick}>
          {loading ? (
            <ButtonLoader type={LoaderTypes.TAILSPIN} color="#9CA3AF" ariaLabel="Loader" />
          ) : (
            <IconContainer>
              <Icon>{icon}</Icon>
            </IconContainer>
          )}
        </Container>
      </ViewPort>
      {isActiveDropdown && (
        <Portal>
          <Dropdown
            ref={dropdownRef}
            style={{ ...coords }}
            width={options.width}
            maxHeight={options.maxHeight}
            alignment={options.alignment}
            zIndex={options.zIndex}
          >
            {renderDropDown}
          </Dropdown>
        </Portal>
      )}
    </Layout>
  );
};

export default React.forwardRef(IconButton);
