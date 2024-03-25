import React, { useRef } from "react";
import {
  ArrowIcon,
  ButtonTest,
  Field,
  HeadOption,
  MenuLink,
  NavLinkStyled,
  ZigMenuItemSubHeader,
} from "./styles";
import { Check } from "@mui/icons-material";
import { Box, useTheme } from "@mui/material";
import ZigTypography from "../../display/ZigTypography";
import { SubHeaderRoute } from "./types";
import MenuDropDown from "../MenuDropDown";
import { NavLink } from "components/display/ZigDropdown/styles";
import { ZigArrowBottomIcon } from "icons";

export const SubHeaderMenuButton = ({ route }: { route: any }) => {
  const { id, name, routes, isCompactElements, secondaryTitle } = route;
  const active = routes.some((x) => x.active);
  return (
    <Box display="flex" justifyContent={"space-between"} alignItems={"center"} gap="8px" flex={1}>
      <Box
        display="flex"
        flexDirection={"column"}
        {...(!secondaryTitle && {
          textAlign: "center",
          width: "100%",
        })}
      >
        {secondaryTitle && (
          <ZigTypography color="neutral400" variant={"caption"} component="p">
            {secondaryTitle}
          </ZigTypography>
        )}
        <ZigTypography
          sx={{
            fontWeight: 400,
            color: !secondaryTitle ? (active ? "highlighted" : "neutral300") : "neutral100",
            // color: (theme) =>
            //   !secondaryTitle ? theme.palette.neutral300 : `${theme.palette.neutral100} !important`,
          }}
          fontWeight={400}
          variant={"h3"}
          component="span"
        >
          {name}
        </ZigTypography>
      </Box>
      <ArrowIcon>
        <ZigArrowBottomIcon />
      </ArrowIcon>
    </Box>
  );
};

export const SubHeaderMenuItem = ({ route, isSubOption, dense }) => {
  const { name, sideElement, active, id, onClick } = route;
  console.log(id, dense, active, isSubOption);
  return (
    <ZigMenuItemSubHeader
      isSubOption={isSubOption}
      id={id}
      onClick={onClick}
      component={isSubOption ? "span" : "li"}
      dense={dense}
      // todo: support href and styles
      // target={option?.target}
      // customStyle={option.customStyle}
      // href={href}
    >
      <Box
        display="flex"
        alignItems="center"
        gap={"5px"}
        justifyContent={isSubOption ? "space-between" : "center"}
        flex={1}
        color={active ? "highlighted" : "neutral300"}
      >
        <ZigTypography
          sx={{
            fontWeight: 400,
            color: "inherit",
            // color: (theme) =>
            //   !secondaryTitle ? theme.palette.neutral300 : `${theme.palette.neutral100} !important`,
          }}
          variant={"h3"}
        >
          {name}
        </ZigTypography>
        {sideElement}
        {isSubOption && !!active && <Check />}
      </Box>
    </ZigMenuItemSubHeader>
  );
};

export const ServiceListOption: React.FC<{
  route: SubHeaderRoute;
  isCompactElements?: boolean;
  isSubGroup?: boolean;
}> = ({ isSubGroup, isCompactElements, route: { onClick, active, name, id, sideElement } }) => {
  return (
    <NavLinkStyled
      id={!isSubGroup ? id : undefined}
      // target={option?.target}
      active={active}
      // customStyle={option.customStyle}
      as={"a"}
      // href={href}
      onclick={onClick}
      // onClick={option.onClick && onClick(option.onClick)}
      isSubOption={!!isSubGroup}
    >
      {name}
    </NavLinkStyled>
  );
  return (
    <MenuLink onClick={onClick} id={id} isSubOption={!!isSubGroup}>
      <HeadOption
        isSubOption={isSubGroup}
        active={!!active}
        sx={isCompactElements ? { minHeight: "38px", paddingY: "7px" } : {}}
      >
        <Box
          display="flex"
          alignItems="center"
          gap={sideElement && "5px"}
          justifyContent={isSubGroup ? "space-between" : "center"}
          flex={1}
        >
          <ZigTypography color="inherit" fontWeight="inherit" variant={"h3"}>
            {name}
          </ZigTypography>
          {sideElement}
          {isSubGroup && !!active && <Check />}
        </Box>
      </HeadOption>
    </MenuLink>
  );
};

export const RouteDropdown: React.FC<{
  id?: string;
  isCompactElements?: boolean;
  title: string;
  secondaryTitle?: string;
  routes: SubHeaderRoute[];
}> = ({ id, routes, secondaryTitle, isCompactElements, title }) => {
  const menuDropDownRef = useRef(null);
  const theme = useTheme();
  return (
    <>
      <MenuDropDown
        id={id}
        ref={menuDropDownRef}
        secondaryTitle={secondaryTitle}
        title={title}
        dropDownStyle={{
          maxHeight: "300px",
          ...(isCompactElements
            ? {
                paddingTop: "15px",
                paddingBottom: "15px",
                background: theme.palette.neutral800,
              }
            : {}),
        }}
        focused={routes.some((x) => x.active)}
      >
        {routes.map((r) => (
          <ServiceListOption
            isCompactElements={isCompactElements}
            isSubGroup={true}
            key={r.id}
            route={{
              ...r,
              onClick: () => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                menuDropDownRef?.current?.setIsDropDownActive(false);
                r?.onClick();
              },
            }}
          />
        ))}
      </MenuDropDown>
    </>
  );
};
