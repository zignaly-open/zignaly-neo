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
      {options.map((entry, i) => {
        // todo: check
        // this is a design requirement
        if (subDropdown && options.indexOf(subDropdown) < i) return null;

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
              as={option.as}
              separator={option.separator}
            >
              {option.element}
            </ComponentWrapper>
          );

        if (option.href || option.onClick) {
          return (
            <ZigMenuItem
              key={key}
              as={"a"}
              href={option.href}
              onClick={option.onClick && onClick(option.onClick)}
              // sx={option.customStyle}
              target={option?.target}
              active={option?.active}
            >
              {option.label}
            </ZigMenuItem>
          );
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
        }

        if (option.children)
          return (
            <ChildContainer key={key} active={subDropdown === option}>
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
      })}
    </MenuList>
  );
};

export const DropdownContent = ({
  id = "",
  options,
  childDropdownShow,
  setChildDropdownShown,
  onClick,
  matchAnchorWidth,
}: {
  childDropdownShow?: ZigDropdownOption;
  matchAnchorWidth?: boolean;
}) => {
  console.log("DropdownContent -> options", options);
  return (
    <ZigDropdownContainer id={id}>
      <NavList matchAnchorWidth={matchAnchorWidth}>
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
                    option.children?.length && setChildDropdownShown((v) => (v ? null : option))
                  }
                >
                  {option.label}
                  <SpaceTaker />

                  {!!option.children?.length && (
                    <ArrowBottomIconStyled
                      style={{ color: "neutral300" }}
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
  );
};
