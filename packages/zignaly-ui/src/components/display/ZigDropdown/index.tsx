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
import { useTheme } from "styled-components";
import Theme from "theme/theme";

const ZigDropdown: (
  props: ZigDropdownProps,
  innerRef: React.Ref<ZigDropdownHandle>,
) => JSX.Element = (
  {
    id,
    component,
    options,
    anchorOrigin = {
      vertical: "bottom",
      horizontal: "right",
    },
    anchorPosition,
    transformOrigin = {
      vertical: "top",
      horizontal: "right",
    },
  }: ZigDropdownProps,
  innerRef: React.Ref<ZigDropdownHandle>,
) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [childDropdownShow, setChildDropdownShown] = React.useState<null | ZigDropdownOption>(null);
  const isOpen = !!anchorEl;
  const theme = useTheme() as Theme;
  const handleToggle = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl((v) => (v ? null : event.currentTarget));

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
      <Component role="button" onClick={handleToggle}>
        {component({ open: isOpen })}
      </Component>
      {options && (
        <Popover
          id="popover-menu"
          anchorEl={anchorEl}
          open={isOpen}
          disableScrollLock={true}
          PaperProps={{
            sx: {
              minWidth: "220px",
              backgroundColor: theme.palette.neutral800,
              whiteSpace: "nowrap",
              color: "#fff",
              boxShadow: "0 4px 6px -2px #00000061",
              borderRadius: "4px 0 4px 4px",
              border: "none",
            },
          }}
          onClose={handleClose}
          anchorPosition={anchorPosition}
          transformOrigin={transformOrigin}
          anchorOrigin={anchorOrigin}
        >
          <ZigDropdownContainer id={id}>
            <NavList>
              {options.map((entry, i) => {
                // this is a design requirement
                if (childDropdownShow && options.indexOf(childDropdownShow) < i) return null;

                const key =
                  (entry && "label" in entry && typeof entry.label === "string" && entry.label) ||
                  entry.id ||
                  Math.random().toString();

                if ("separator" in entry) {
                  return (
                    <ComponentSeparator
                      id={entry.id || `dropdown-element-${i}`}
                      separator={entry.separator}
                      customStyle={entry.customStyle}
                      key={key}
                    />
                  );
                }

                const option = entry as ZigDropdownOption;

                if (option.element)
                  return (
                    <ComponentWrapper
                      id={option.id || `dropdown-element-${i}`}
                      customStyle={option.customStyle}
                      key={key}
                    >
                      {option.element}
                    </ComponentWrapper>
                  );

                if (option.href || option.onClick)
                  return (
                    <NavLink
                      id={option.id}
                      key={key}
                      target={option?.target}
                      active={option?.active}
                      customStyle={option.customStyle}
                      as={"a"}
                      href={option.href}
                      onClick={option.onClick && onClick(option.onClick)}
                    >
                      {option.label}
                    </NavLink>
                  );

                if (option.children)
                  return (
                    <ChildContainer key={key} active={childDropdownShow === option}>
                      <NavLink
                        active={option?.active}
                        id={option.id}
                        customStyle={option.customStyle}
                        notClickable={!option.children?.length}
                        onClick={() =>
                          option.children?.length &&
                          setChildDropdownShown((v) => (v ? null : option))
                        }
                      >
                        {option.label}
                        <SpaceTaker />

                        {!!option.children?.length && (
                          <ArrowBottomIconStyled
                            color={theme.palette.neutral300}
                            rotated={childDropdownShow === option}
                            width={"10.5px"}
                          />
                        )}
                      </NavLink>
                      {childDropdownShow === option && (
                        <SubNavList>
                          {option.children.map((c, index) => (
                            <NavLink
                              id={c.id}
                              active={c?.active || undefined}
                              key={
                                "--sub-" +
                                key +
                                "--" +
                                (typeof c.label === "string" ? c.label : `-child-${index}`)
                              }
                              onClick={onClick(c.onClick!)}
                            >
                              {c.label}
                            </NavLink>
                          ))}
                        </SubNavList>
                      )}
                    </ChildContainer>
                  );
              })}
            </NavList>
          </ZigDropdownContainer>
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
