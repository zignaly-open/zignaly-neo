// Dependencies
import React, { ReactElement } from "react";

// Types
import { HeaderProps } from "./types";
import { headerConfig } from "./utils";

// Styled Components
import { Layout, Side } from "./styles";

function Header({ leftElements = [], rightElements = [] }: HeaderProps) {
  return (
    <Layout>
      <Side>
        {leftElements &&
          leftElements.length > 0 &&
          leftElements.map((element: ReactElement) => element)}
      </Side>

      <Side>
        {rightElements &&
          rightElements.length > 0 &&
          rightElements.map((element: ReactElement) => element)}
      </Side>
    </Layout>
  );
}

export { headerConfig };
export default Header;
