import Popover from "@mui/material/Popover";
import React, { MouseEvent, useEffect, useImperativeHandle } from "react";
import { ZigDropdownProps, ZigDropdownHandle, ZigDropdownOption } from "./types";
import {
  ArrowBottomIconStyled,
  ChildContainer,
  Component,
  ComponentWrapper,
  ZigDropdownContainer,
  NavLink,
  NavList,
  SpaceTaker,
  ComponentSeparator,
  SubNavList,
} from "./styles";
import { Theme } from "@mui/material";
import { DropdownContent, MenuContent } from "./atoms";

const ZigDropdown: (
  props: ZigDropdownProps,
  innerRef: React.Ref<ZigDropdownHandle>,
) => JSX.Element = (
  {
    id = "",
    component,
    options,
    position = "right",
    anchorOrigin = {
      vertical: "bottom",
      horizontal: position,
    },
    anchorPosition,
    transformOrigin = {
      vertical: "top",
      horizontal: position,
    },
    disabled,
    matchAnchorWidth = false,
    menuSx,
  }: ZigDropdownProps,
  innerRef: React.Ref<ZigDropdownHandle>,
) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [childDropdownShow, setChildDropdownShown] = React.useState<null | ZigDropdownOption>(null);
  const isOpen = !!anchorEl;
  const handleToggle = (event: React.MouseEvent<HTMLElement>) =>
    !disabled ? setAnchorEl((v) => (v ? null : event.currentTarget)) : () => {};

  const handleClose = () => {
    setChildDropdownShown(null);
    setAnchorEl(null);
  };

  useImperativeHandle(
    innerRef,
    () => ({
      closeDropDown: () => {
        handleClose();
      },
      open: isOpen,
    }),
    [anchorEl, isOpen],
  );
  const onClick = (f: () => void) => (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    handleClose();
    // the timeout here is needed because an action can trigger Suspense and then the popover will remain somewhere on the page
    setTimeout(() => {
      if (e.button === 1) {
        // middle button fix for Safari
        window.open(e.currentTarget.href);
      } else {
        f();
      }
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleClose);
    return () => {
      window.removeEventListener("scroll", handleClose);
    };
  }, []);

  return (
    <>
      <Component role="button" onClick={handleToggle} id={id && `${id}-container`}>
        {component({ open: isOpen })}
      </Component>
      {options && (
        <Popover
          id="popover-menu"
          anchorEl={anchorEl}
          open={isOpen}
          disableScrollLock={true}
          slotProps={{
            paper: {
              sx: {
                width: matchAnchorWidth ? anchorEl?.offsetWidth : "auto",
                minWidth: "220px",
                backgroundColor: "neutral800",
                color: "#fff",
                boxShadow: "0 4px 6px -2px #00000061",
                borderRadius: `${position === "right" ? 4 : 0}px ${
                  position === "right" ? 0 : 4
                } 4px 4px`,
                border: "none",
                ...menuSx,
              },
            },
          }}
          onClose={handleClose}
          anchorPosition={anchorPosition}
          transformOrigin={transformOrigin}
          anchorOrigin={anchorOrigin}
        >
          <MenuContent
            id={id}
            options={options}
            setChildDropdownShown={setChildDropdownShown}
            subDropdown={childDropdownShow}
            onClick={onClick}
            matchAnchorWidth={matchAnchorWidth}
          />
        </Popover>
      )}
    </>
  );
};

export default React.forwardRef(ZigDropdown);

export type {
  ZigDropdownProps,
  ZigDropdownHandle as ZigDropdownHandleType,
  ZigDropdownOption as ZigDropdownOptionType,
} from "./types";
