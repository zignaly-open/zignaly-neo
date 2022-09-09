// Dependencies
import React, { ReactElement } from "react";

// Types
import { HeaderProps } from "./types";
import { headerConfig } from "./utils";

// Styled Components
import { Container, Layout, Side } from "./styles";

function Header({ leftElements = [], rightElements = [], className }: HeaderProps): ReactElement {
  return (
    <Layout className={className}>
      <Container>
        <Side>{leftElements?.length > 0 && leftElements}</Side>
        <Side>{rightElements?.length > 0 && rightElements}</Side>
      </Container>
    </Layout>
  );
}

export { headerConfig };
export default Header;
