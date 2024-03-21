import React, { useRef } from "react";
import { HeadOption, MenuLink } from "./styles";
import { Check } from "@mui/icons-material";
import { Box, useTheme } from "@mui/material";
import ZigTypography from "../../display/ZigTypography";
import { SubHeaderRoute } from "./types";
import MenuDropDown from "../MenuDropDown";

export const ServiceListOption: React.FC<{
  route: SubHeaderRoute;
  isCompactElements?: boolean;
  isSubGroup?: boolean;
}> = ({ isSubGroup, isCompactElements, route: { onClick, active, name, id, sideElement } }) => {
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
