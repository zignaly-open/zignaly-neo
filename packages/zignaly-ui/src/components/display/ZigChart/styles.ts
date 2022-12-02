import { css, styled } from "@mui/system";
import { styledIf } from "utils/styled";
import { ChartVariations } from "./types";

export const WideWrapper = styled("div")<{ wide: boolean }>`
  ${(props) =>
    props.wide &&
    css`
      width: 100%;
    `}
`;

export const Layout = styled("div")<{ variant: keyof typeof ChartVariations }>`
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

export const ChartLayoutMini = styled("div")<{ height?: number }>`
  height: ${(props) => props.height || 100}px;
  width: auto;
  display: inline-block;
`;
