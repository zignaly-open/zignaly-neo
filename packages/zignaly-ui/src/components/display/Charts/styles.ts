import styled, { css } from "styled-components";
import { styledIf } from "utils/styled";
import { ChartVariations } from "./types";

export const WideWrapper = styled.div<{ wide: boolean }>`
  ${(props) =>
    props.wide &&
    css`
      width: 100%;
    `}
`;

export const Layout = styled.div<{ variant: keyof typeof ChartVariations }>`
  ${(props) => `
    ${styledIf(
      props.variant === "large",
      `
       height: 400px;
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
