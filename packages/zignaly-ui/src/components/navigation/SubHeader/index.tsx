import React from "react";
import { Layout, Container } from "./styles";
import { MarginContainer } from "../../styled";
import { RouteDropdown, ServiceListOption } from "./atoms";
import { SubHeaderDropdown, SubHeaderElement, SubHeaderRoute } from "./types";
import { SxProps } from "@mui/system";

function SubHeader({
  routes,
  containerSx,
}: {
  containerSx?: SxProps;
  routes: (SubHeaderElement | SubHeaderRoute | SubHeaderDropdown)[];
}) {
  return (
    <Layout>
      <MarginContainer>
        <Container sx={containerSx}>
          {routes.map((r) => {
            if ("element" in r) {
              return <React.Fragment key={r.id}>{r.element}</React.Fragment>;
            } else if ("routes" in r) {
              const { id, name, routes, isCompactElements, secondaryTitle } =
                r as SubHeaderDropdown;
              return (
                <RouteDropdown
                  id={id}
                  title={name}
                  routes={routes}
                  secondaryTitle={secondaryTitle}
                  isCompactElements={isCompactElements}
                />
              );
            } else {
              return <ServiceListOption key={r.id} route={r} />;
            }
          })}
        </Container>
      </MarginContainer>
    </Layout>
  );
}

export default SubHeader;
export { SubHeaderRoute };
