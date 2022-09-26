import Popover from "@mui/material/Popover";
import React, { useImperativeHandle } from "react";
import { DropDownProps, DropDownHandle, DropDownOption } from "./types";
import {
  ArrowBottomIconStyled,
  ChildContainer,
  Component,
  ComponentWrapper,
  DropDownContainer,
  NavLink,
  NavList,
  SpaceTaker,
} from "./styles";
import { useTheme } from "styled-components";
import Theme from "theme/theme";

const DropDown: (props: DropDownProps, innerRef: React.Ref<DropDownHandle>) => JSX.Element = (
  {
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
  }: DropDownProps,
  innerRef: React.Ref<DropDownHandle>,
) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [childDropdownShow, setChildDropdownShown] = React.useState<null | DropDownOption>(null);
  const open = Boolean(anchorEl);
  const theme = useTheme() as Theme;
  const handleToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (open) {
      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

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
      open,
    }),
    [anchorEl, open],
  );

  const onClick = (f: () => void) => () => {
    handleClose();
    f();
  };

  return (
    <>
      <Component onClick={handleToggle}>{component({ open })}</Component>
      {options && (
        <Popover
          id="popover-menu"
          anchorEl={anchorEl}
          open={open}
          disableScrollLock={true}
          PaperProps={{
            sx: {
              minWidth: "220px",
              backgroundColor: "#12152c",
              whiteSpace: "nowrap",
              color: "#fff",
              boxShadow: "0 4px 6px -2px #00000061",
              borderRadius: "4px 0 4px 4px",
            },
          }}
          onClose={handleClose}
          anchorPosition={anchorPosition}
          transformOrigin={transformOrigin}
          anchorOrigin={anchorOrigin}
        >
          <DropDownContainer>
            <NavList>
              {options.map((x, i) => {
                // this is a design requirement
                if (childDropdownShow && options.indexOf(childDropdownShow) < i) return null;

                const key =
                  x && "label" in x && typeof x.label === "string"
                    ? x.label
                    : Math.random().toString();

                if (x.element)
                  return (
                    <ComponentWrapper separator={x.separator} key={key}>
                      {x.element}
                    </ComponentWrapper>
                  );
                const option = x as DropDownOption;
                if (option.href)
                  return (
                    <NavLink
                      key={key}
                      separator={x.separator}
                      active={option?.active}
                      as={"a"}
                      href={option.href}
                    >
                      {option.label}
                    </NavLink>
                  );
                if (option.onClick)
                  return (
                    <NavLink
                      key={key}
                      separator={x.separator}
                      active={option?.active}
                      onClick={onClick(option.onClick)}
                    >
                      {option.label}
                    </NavLink>
                  );
                if (option.children)
                  return (
                    <ChildContainer
                      separator={x.separator}
                      key={key}
                      active={childDropdownShow === option}
                    >
                      <NavLink
                        active={option?.active}
                        notClickable={!option.children?.length}
                        onClick={() =>
                          option.children?.length &&
                          setChildDropdownShown((v) => (v ? null : option))
                        }
                      >
                        {option.label}
                        <SpaceTaker />
                        {option.children?.length && (
                          <ArrowBottomIconStyled
                            color={theme.neutral300}
                            width={"22px"}
                            height={"22px"}
                          />
                        )}
                      </NavLink>
                      {childDropdownShow === option &&
                        option.children.map((c) => (
                          <NavLink
                            active={c?.active}
                            key={"--language-" + c.label}
                            onClick={onClick(c.onClick!)}
                          >
                            {c.label}
                          </NavLink>
                        ))}
                    </ChildContainer>
                  );
              })}
            </NavList>
          </DropDownContainer>
        </Popover>
      )}
    </>
  );
};

export default React.forwardRef(DropDown);
