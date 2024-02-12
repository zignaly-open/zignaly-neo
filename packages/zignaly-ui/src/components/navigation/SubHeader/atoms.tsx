import React from "react";
import { HeadOption, MenuLink } from "./styles";
import { Check } from "@mui/icons-material";
import { Box } from "@mui/material";
import ZigTypography from "../../display/ZigTypography";
import { SubHeaderRoute } from "./types";
import MenuDropDown from "../MenuDropDown";

export const ServiceListOption: React.FC<{
  route: SubHeaderRoute;
  isSubGroup?: boolean;
}> = ({ isSubGroup, route: { onClick, active, name, id, sideElement } }) => {
  return (
    <MenuLink onClick={onClick} id={id} isSubOption={!!isSubGroup}>
      <HeadOption isSubOption={isSubGroup} active={!!active}>
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
  title: string;
  routes: SubHeaderRoute[];
}> = ({ id, routes, title }) => {
  return (
    <>
      <MenuDropDown
        id={id}
        title={title}
        dropDownOptions={{
          maxHeight: "300px",
        }}
        focused={routes.some((x) => x.active)}
      >
        {routes.map((r) => (
          <ServiceListOption isSubGroup={true} key={r.id} route={r} />
        ))}
      </MenuDropDown>
    </>
  );
};
