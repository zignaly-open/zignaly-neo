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
import {
  Theme,
  Popper,
  ClickAwayListener,
  Grow,
  Paper,
  Button,
  MenuItem,
  MenuList,
  Box,
} from "@mui/material";
import { DropdownContent, MenuContent } from "./atoms";

const getPlacementStyles = (placement) => {
  switch (placement) {
    case "bottom-start":
      return {
        transformOrigin: "left top",
        borderRadius: "10px 10px 0 10px",
      };
    case "bottom-end":
      return {
        transformOrigin: "right top",
        borderRadius: "10px 10px 0 10px",
      };
    case "top-start":
      return {
        transformOrigin: "right bottom",
        borderRadius: "10px 0 10px 10px",
      };
    case "top-end":
    default:
      return {
        transformOrigin: "left bottom",
        borderRadius: "10px 10px 10px 0",
      };
  }
};

const ZigDropdown: (
  props: ZigDropdownProps,
  innerRef: React.Ref<ZigDropdownHandle>,
) => JSX.Element = (
  {
    id = "",
    component,
    options,
    position = "right",
    placement = "top-end",
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
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  // const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [childDropdownShow, setChildDropdownShown] = React.useState<null | ZigDropdownOption>(null);
  // const isOpen = !!anchorRef.current;
  // const handleToggle = (event: React.MouseEvent<HTMLElement>) =>
  //   !disabled ? setAnchorEl((v) => (v ? null : event.currentTarget)) : () => {};

  // const handleClose = () => {
  //   setChildDropdownShown(null);
  //   setAnchorEl(null);
  // };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };

  const placementStyles = getPlacementStyles(placement);
  console.log(placementStyles);

  // function handleListKeyDown(event: React.KeyboardEvent) {
  //   if (event.key === "Tab") {
  //     event.preventDefault();
  //     setOpen(false);
  //   } else if (event.key === "Escape") {
  //     setOpen(false);
  //   }
  // }

  // // return focus to the button when we transitioned from !open -> open
  // const prevOpen = React.useRef(open);
  // React.useEffect(() => {
  //   if (prevOpen.current === true && open === false) {
  //     anchorRef.current!.focus();
  //   }

  //   prevOpen.current = open;
  // }, [open]);

  // useImperativeHandle(
  //   innerRef,
  //   () => ({
  //     closeDropDown: () => {
  //       handleClose();
  //     },
  //     open,
  //   }),
  //   [anchorEl, open],
  // );
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

  // useEffect(() => {
  //   window.addEventListener("scroll", handleClose);
  //   return () => {
  //     window.removeEventListener("scroll", handleClose);
  //   };
  // }, []);
  return (
    <>
      {/* <Button
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? "composition-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        Dashboard
      </Button> */}
      <Box ref={anchorRef} role="button" onClick={handleToggle} id={id && `${id}-container`}>
        {component({ open })}
      </Box>
      {options && (
        // <Popover
        //   id="popover-menu"
        //   anchorEl={anchorEl}
        //   open={open}
        //   disableScrollLock={true}
        //   slotProps={{
        //     paper: {
        //       sx: {
        //         width: matchAnchorWidth ? anchorEl?.offsetWidth : "auto",
        //         minWidth: "220px",
        //         backgroundColor: "neutral800",
        //         color: "#fff",
        //         boxShadow: "0 4px 6px -2px #00000061",
        //         borderRadius: `${position === "right" ? 4 : 0}px ${
        //           position === "right" ? 0 : 4
        //         } 4px 4px`,
        //         border: "none",
        //         ...menuSx,
        //       },
        //     },
        //   }}
        //   onClose={handleClose}
        //   anchorPosition={anchorPosition}
        //   transformOrigin={transformOrigin}
        //   anchorOrigin={anchorOrigin}
        // >

        <Popper
          open={open}
          anchorEl={anchorRef.current}
          // anchorEl={anchorEl}
          role={undefined}
          placement={placement}
          transition
          // disablePortal
          sx={{
            minWidth: matchAnchorWidth ? anchorRef.current?.offsetWidth : "220px",
            zIndex: 1300,
            // color: "#fff",
            " > div": {
              boxShadow: "0 4px 6px -2px #00000061",
              borderRadius: placementStyles.borderRadius,
              // borderRadius: "4px",
              overflow: "hidden",
              backgroundColor: "neutral800",
            },
            ".MuiList-root": {},
            ...menuSx,
          }}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: placementStyles.transformOrigin,
              }}
              timeout={open ? 180 : 0}
            >
              <div>
                <ClickAwayListener onClickAway={handleClose}>
                  <div>
                    <MenuContent
                      id={id}
                      options={options}
                      setChildDropdownShown={setChildDropdownShown}
                      subDropdown={childDropdownShow}
                      onClick={onClick}
                      matchAnchorWidth={matchAnchorWidth}
                    />
                  </div>
                </ClickAwayListener>
              </div>
            </Grow>
          )}
        </Popper>
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
