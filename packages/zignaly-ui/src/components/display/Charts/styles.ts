import styled from "styled-components";
import { styledIf } from "utils/styled";
import { ChartVariations } from "./types";

export const Layout = styled.div<{ variant: keyof typeof ChartVariations }>`
  ${(props) => `
    ${styledIf(
      props.variant === "large",
      `
       height: 320px;
       width: auto;
       `,
    )}
    ${styledIf(
      props.variant === "small",
      `
      height: 100px;
      width: auto;
        `,
    )}
    `}
`;
