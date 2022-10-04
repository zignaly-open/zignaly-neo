import styled from "styled-components";
import { styledIf } from "utils/styled";

const getWeight = (weight: string) => {
  if (weight === "demibold") {
    return 600;
  } else if (weight === "medium") {
    return 500;
  } else {
    return 400;
  }
};

interface LayoutProps {
  color: string;
  underline: boolean;
  weight: string;
  marginRight?: number;
  marginLeft?: number;
  marginTop?: number;
  marginBottom?: number;
}

export const Layout = styled.h1<LayoutProps>`
  font-family: "Avenir next", "Red Hat Text", sans-serif;
  margin: 0;
  padding: 0;
  font-weight: 500;

  &.h1 {
    font-size: 22px;
    line-height: 36px;
    letter-spacing: 0.55px;
  }

  &.h2 {
    font-size: 18px;
    line-height: 28px;
    letter-spacing: 0.55px;
  }

  &.h3 {
    font-size: 15px;
    line-height: 24px;
    letter-spacing: 0.55px;
  }

  &.h4 {
    font-size: 13px;
    line-height: 20px;
    letter-spacing: 0.55px;
  }

  &.h5 {
    font-size: 11px;
    line-height: 16px;
    letter-spacing: 0.55px;
  }

  &.bigNumber {
    font-size: 26px;
    line-height: 40px;
    letter-spacing: 0.55px;
  }

  &.body1 {
    font-size: 15px;
    line-height: 24px;
    letter-spacing: 0.55px;
  }

  &.body2 {
    font-size: 13px;
    line-height: 20px;
    letter-spacing: 0.55px;
  }

  &.buttonxl {
    font-size: 16px;
    line-height: 20px;
    letter-spacing: 1.1px;
    font-weight: 600;
  }

  &.buttonl {
    font-size: 13px;
    line-height: 18px;
    letter-spacing: 1.1px;
    font-weight: 600;
  }

  &.buttonm {
    font-size: 11px;
    line-height: 14px;
    letter-spacing: 1.1px;
    font-weight: 600;
  }

  &.buttonsm {
    font-size: 11px;
    line-height: 12px;
    font-weight: 600;
    letter-spacing: 1.1px;
  }

  &.inputl {
    font-size: 16px;
    line-height: 20px;
    font-weight: 400;
    letter-spacing: 0.55px;
  }

  &.inputm {
    font-size: 13px;
    line-height: 18px;
    font-weight: 400;
    letter-spacing: 0.55px;
  }

  &.labelm {
    font-weight: 400;
    font-size: 15px;
    line-height: 24px;
    letter-spacing: 0.55px;
  }

  ${(props) => `
    color: inherit;

    ${styledIf(
      props.color,
      `
      color: ${props.theme[props.color]};    
    `,
    )}
    ${styledIf(
      props.underline,
      `
      text-decoration-color: ${props.theme[props.color]};
      text-decoration-line: underline;
    `,
    )}
    ${styledIf(
      props.weight,
      `
      font-weight: ${getWeight(props.weight)};
    `,
    )}
  `}
`;
