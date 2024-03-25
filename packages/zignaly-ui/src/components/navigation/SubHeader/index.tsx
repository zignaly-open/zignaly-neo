import React, { useRef } from "react";
import { Layout, Container, ButtonTest, ArrowIcon, Field, ZigMenuItemSubHeader } from "./styles";
import { MarginContainer } from "../../styled";
import { RouteDropdown, ServiceListOption, SubHeaderMenuButton, SubHeaderOption } from "./atoms";
import { SubHeaderDropdown, SubHeaderElement, SubHeaderRoute } from "./types";
import { SxProps } from "@mui/system";
import ZigDropdown from "components/display/ZigDropdown";
import ZigButton from "components/inputs/ZigButton";
import ZigTypography from "components/display/ZigTypography";
import { ZigArrowBottomIcon } from "icons";
import { useLocation, useNavigate } from "react-router-dom";

const optionSx = {
  padding: "7px 10%",
  height: "56px",
};

function SubHeader({
  routes,
  containerSx,
}: {
  containerSx?: SxProps;
  routes: (SubHeaderElement | SubHeaderRoute | SubHeaderDropdown)[];
}) {
  console.log("SubHeader -> routes", routes);
  return (
    <Layout>
      <MarginContainer>
        <Container sx={containerSx}>
          {routes.map((r, i) => {
            if ("element" in r) {
              return <React.Fragment key={r.id}>{r.element}</React.Fragment>;
            } else if ("routes" in r) {
              const { id, name, routes, isCompactElements, secondaryTitle } =
                r as SubHeaderDropdown;

              return (
                <ZigMenuItemSubHeader
                  id={id}
                  sx={{
                    padding: 0,
                    "> div": {
                      padding: "6px 28px",
                      display: "flex",
                      flex: 1,
                      justifyContent: "center",
                    },
                  }}
                >
                  <ZigDropdown
                    position={i > routes.length / 2 ? "right" : "left"}
                    matchAnchorWidth={true}
                    component={({ open }) => <SubHeaderMenuButton route={r} />}
                    id={r.id}
                    menuSx={{
                      maxHeight: "300px",
                    }}
                    // ZigMenuItemSubHeader styles?
                    options={r.routes.map((rr) => ({
                      ...((rr.href || rr.onClick) && {
                        element: (
                          <SubHeaderOption
                            route={rr}
                            dense={r.isCompactElements}
                            isSubOption={true}
                          />
                        ),
                        keepHover: true,
                      }),
                      sx: {
                        ...optionSx,
                        ...(r.isCompactElements && { height: "auto" }),
                        // padding: "7px 34px"
                        //     padding: 6px 20px;
                      },
                      ...rr,
                    }))}
                  />
                </ZigMenuItemSubHeader>
              );
            } else {
              return (
                <ZigMenuItemSubHeader
                  id={r.id}
                  // onClick={option.onClick && onClick(option.onClick)}
                  onClick={r.onClick}
                  component={"a"}
                  href={r.href}
                  target={r.target}
                  active={r.active}
                  sx={{
                    ...optionSx,
                    ...r.sx,
                  }}
                >
                  <SubHeaderOption key={r.id} route={r} />
                </ZigMenuItemSubHeader>
              );
            }
          })}
        </Container>
      </MarginContainer>
    </Layout>
  );
}

export default SubHeader;
export { SubHeaderRoute };
