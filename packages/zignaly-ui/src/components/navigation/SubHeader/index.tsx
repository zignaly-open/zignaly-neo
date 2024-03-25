import React, { useRef } from "react";
import { Layout, Container, ButtonTest, ArrowIcon, Field, ZigMenuItemSubHeader } from "./styles";
import { MarginContainer } from "../../styled";
import { RouteDropdown, ServiceListOption, SubHeaderMenuButton, SubHeaderMenuItem } from "./atoms";
import { SubHeaderDropdown, SubHeaderElement, SubHeaderRoute } from "./types";
import { SxProps } from "@mui/system";
import ZigDropdown from "components/display/ZigDropdown";
import ZigButton from "components/inputs/ZigButton";
import ZigTypography from "components/display/ZigTypography";
import { ZigArrowBottomIcon } from "icons";

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
                  // // target={option?.target}
                  // // customStyle={option.customStyle}
                  // // as={"span"}
                  // // href={href}
                  // // onclick={()}
                  // // onClick={option.onClick && onClick(option.onClick)}
                  // isSubOption={false}
                >
                  <ZigDropdown
                    position={i > routes.length / 2 ? "right" : "left"}
                    matchAnchorWidth={true}
                    component={({ open }) => <SubHeaderMenuButton route={r} />}
                    id={r.id}
                    menuSx={{
                      maxHeight: "300px",
                    }}
                    options={r.routes.map((rr) => ({
                      id: rr.id,
                      element: (
                        <SubHeaderMenuItem
                          route={rr}
                          dense={r.isCompactElements}
                          isSubOption={true}
                        />
                      ),
                      // todo: handle in ZigDropdown
                      as: "li",
                      customStyle: {
                        padding: 0,
                        "> span": {
                          padding: "7px 10%",
                        },
                      },
                    }))}
                  />
                </ZigMenuItemSubHeader>
              );
            } else {
              return <SubHeaderMenuItem key={r.id} route={r} />;
            }
          })}
        </Container>
      </MarginContainer>
    </Layout>
  );
}

export default SubHeader;
export { SubHeaderRoute };
