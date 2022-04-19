// Dependencies
import styled from "styled-components";
import { styledIf } from "utils/styled";

export const Layout = styled.h1<{ color: string }>`
  font-family: "Avenir", sans-serif;
  margin: 0;

  &.h1 {
    font-weight: 500;
    font-size: 22px;
    line-height: 36px;
    letter-spacing: 1px;
  }

  &.h2 {
    font-size: 18px;
    line-height: 28px;
    letter-spacing: 0.66px;
    font-weight: 500;
  }

  &.h3 {
    font-size: 15px;
    line-height: 24px;
    font-weight: 500;
    letter-spacing: 0.33px;
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

  &.body1 {
    &.regular {
      font-size: 15px;
      font-weight: 400;
      line-height: 24px;
      letter-spacing: 0.33px;
    }

    &.medium {
      font-size: 15px;
      font-weight: 500;
      line-height: 24px;
      letter-spacing: 0.33px;
    }

    &.demibold {
      font-weight: 600;
      font-size: 15px;
      line-height: 24px;
      letter-spacing: 0.33px;
    }
  }

  &.body2 {
    &.regular {
      font-size: 13px;
      font-weight: 400;
      line-height: 24px;
      letter-spacing: 0.33px;
    }

    &.medium {
      font-size: 13px;
      font-weight: 500;
      line-height: 24px;
      letter-spacing: 0.33px;
    }

    &.demibold {
      font-weight: 600;
      font-size: 13px;
      line-height: 24px;
      letter-spacing: 0.33px;
    }
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
  `}

  &.style-number {
    letter-spacing: 1px;
  }
`;
