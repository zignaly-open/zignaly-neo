// Dependencies
import styled from "styled-components";
import { styledIf } from "utils/styled";

export const Layout = styled.h1<{ color: string; underline: boolean; weight: string }>`
  font-family: "Avenir next","Red Hat Text", sans-serif;
  margin: 0;
  letter-spacing: 0.55px;

  &.h1 {
    font-weight: 500;
    font-size: 22px;
    line-height: 36px;
  }

  &.h2 {
    font-size: 18px;
    line-height: 28px;
    font-weight: 500;
  }

  &.h3 {
    font-size: 15px;
    line-height: 24px;
    font-weight: 500;
  }

  &.h4 {
    font-weight: 500;
    font-size: 13px;
    line-height: 20px;
  }

  &.h5 {
    font-weight: 500;
    font-size: 11px;
    line-height: 16px;
  }
  
  &.bigNumber {
    font-weight: 500;
    font-size: 26px;
    line-height: 40px;
  }

  &.body1 {
    font-size: 15px;
    line-height: 24px;
  }

  &.body2 {
    font-size: 13px;
    line-height: 20px;
  }

  ${(props: any) => `
    color: inherit;

    ${styledIf(
      props.color,
      `
      color: ${props.color};
    `,
    )}
    ${styledIf(
      props.underline,
      `
      text-decoration-line: underline;
    `,
    )}
    ${styledIf(
      props.weight === "demibold",
      `
      font-weight: 600;
    `,
    )}
    ${styledIf(
      props.weight === "regular",
      `
      font-weight: 400;
    `,
    )}
    ${styledIf(
      props.weight === "medium",
      `
      font-weight: 500;
    `,
    )}
  `}
`;
