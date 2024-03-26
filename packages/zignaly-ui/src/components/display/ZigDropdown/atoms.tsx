import React, { FC, ReactNode, useState } from "react";
import {
  ArrowBottomIconStyled,
  ChildContainer,
  ComponentSeparator,
  ComponentWrapper,
  NavLink,
  NavList,
  SpaceTaker,
  SubNavList,
  ZigDropdownContainer,
  ZigMenuItem,
} from "./styles";
import { ZigDropdownOption } from "./types";
import { MenuItem, MenuList } from "@mui/material";

export const MenuOption = ({
  option,
  index,
  onClick,
  subDropdown,
  setChildDropdownShown,
  keyName: key,
}: {
  option: ZigDropdownOption;
}) => {
  const { id, onClick } = option;
  const renderComponent = () => {
    if (option.element)
      return (
        <ZigMenuItem
          id={id}
          onClick={onClick}
          id={option.id || `dropdown-element-${index}`}
          // as={option.as}
          preserveStyles={option.preserveStyles ?? false}
          sx={{
            ...option.sx,
          }}
        >
          {option.element}
        </ZigMenuItem>
      );

    if (option.href || option.onClick) {
      return (
        <ZigMenuItem
          component={"a"}
          href={option.href}
          // onClick={option.onClick && onClick(option.onClick)}
          sx={option.sx}
          target={option?.target}
          active={option?.active}
        >
          {option.label}
        </ZigMenuItem>
      );
    }

    if (option.children) {
      return (
        <ChildContainer active={subDropdown === option}>
          <NavLink
            active={option?.active}
            id={option.id}
            customStyle={option.customStyle}
            notClickable={!option.children?.length}
            onClick={() =>
              option.children?.length && setChildDropdownShown((v) => (v ? null : option))
            }
          >
            {option.label}
            <SpaceTaker />

            {!!option.children?.length && (
              <ArrowBottomIconStyled
                style={{ color: "neutral300" }}
                rotated={subDropdown === option}
                width={"10.5px"}
              />
            )}
          </NavLink>
          {subDropdown === option && (
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
    }
    return null;
  };

  return (
    <>
      {option.separator && <ComponentSeparator separator={true} sx={option.sx} />}
      {renderComponent()}
    </>
  );
};

export const MenuContent = ({
  id = "",
  options,
  subDropdown,
  setChildDropdownShown,
  onClick,
  matchAnchorWidth,
}) => {
  console.log("MenuContent -> options", options);
  const handleClose = () => {};

  return (
    <MenuList
      autoFocusItem={open}
      id="composition-menu"
      aria-labelledby="composition-button"
      // onKeyDown={handleListKeyDown}
      sx={{
        ".MuiMenuItem-root": {
          whiteSpace: matchAnchorWidth ? "normal" : "nowrap",
        },
      }}
    >
      {options.map((option, i) => {
        if (subDropdown && options.indexOf(subDropdown) < i) return null;
        const key =
          (option && "label" in option && typeof option.label === "string" && option.label) ||
          option.id ||
          Math.random().toString();
        return (
          <MenuOption
            option={option}
            index={i}
            key={key}
            keyName={key}
            onClick={onClick}
            subDropdown={subDropdown}
            setChildDropdownShown={setChildDropdownShown}
          />
        );
      })}
    </MenuList>
  );
};
