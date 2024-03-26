import React, { useRef } from "react";
import {
  ArrowIcon,
  ButtonTest,
  Field,
  HeadOption,
  MenuLink,
  NavLinkStyled,
  ZigMenuItemSubHeader,
  ZigArrowBottomIconStyled,
} from "./styles";
import { Check } from "@mui/icons-material";
import { Box, useTheme } from "@mui/material";
import ZigTypography from "../../display/ZigTypography";
import { SubHeaderRoute } from "./types";
import MenuDropDown from "../MenuDropDown";
import { NavLink } from "components/display/ZigDropdown/styles";
import { ZigArrowBottomIcon } from "icons";
import { useLocation, useNavigate } from "react-router-dom";

export const SubHeaderMenuButton = ({ route, sx, open }: { route: any }) => {
  const { id, label, routes, isCompactElements, secondaryTitle } = route;
  const active = routes.some((x) => x.active);
  const theme = useTheme();

  return (
    <Box
      display="flex"
      justifyContent={"space-between"}
      alignItems={"center"}
      gap="8px"
      flex={1}
      sx={sx}
    >
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
          }}
          fontWeight={400}
          variant={"h3"}
          component="span"
        >
          {label}
        </ZigTypography>
      </Box>
      <ZigArrowBottomIconStyled rotate={open} />
    </Box>
  );
};

export const SubHeaderOption = ({ route, isSubOption, dense }) => {
  const { label, sideElement, active, id, onClick } = route;

  return (
    <Box
      display="flex"
      alignItems="center"
      gap={"5px"}
      justifyContent={isSubOption ? "space-between" : "center"}
      flex={1}
      color={active ? "highlighted" : "inherit"}
    >
      <ZigTypography
        sx={{
          fontWeight: 400,
          color: "inherit",
        }}
        variant={"h3"}
        display="flex"
        flex={1}
        justifyContent={isSubOption ? "flex-start" : "center"}
      >
        {label}
      </ZigTypography>
      {sideElement}
      {isSubOption && !!active && <Check />}
    </Box>
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
