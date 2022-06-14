// Dependencies
import styled from "styled-components";
import { dark } from "theme";
import { styledIf } from "utils/styled";

export const InputValue = styled.input`
  padding-right: 22px;
  background: transparent !important;
  border: none;
  color: ${dark["neutral100"]};
  outline: none;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0.55px;
  width: 100%;
  font-family: "Avenir Next", sans-serif;

  // Text Area
  resize: none;

  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px white inset;
  }

  &:-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0 50px white inset;
    -webkit-text-fill-color: #333;
  }

  -webkit-text-fill-color: #838b95 !important;
`;

export const IconContainer = styled.div`
  margin-right: 16px;
`;

export const Side = styled.div<{ cursor: "auto" | "pointer" }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1;
  cursor: ${(props) => props.cursor};

  &:last-child:not(:first-child) {
    flex: 0;
    width: auto;
  }
`;

export const InputContainer = styled.div<{ withoutBorder?: boolean }>`
  border: 1px solid #35334a;
  padding: 12px 24px;
  min-height: 60px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  background: rgba(16, 18, 37, 0.7);
  margin-top: 4px;
  gap: 22px;
  margin-bottom: 10px;
  ${(props) =>
    `${styledIf(
      props.withoutBorder,
      `
      border: none
  `,
    )}`}
`;

type LayoutProps = {
  withError: boolean;
  disabled: boolean;
};

export const Layout = styled.div`
  ${(props: LayoutProps) => `
    ${styledIf(
      props.withError,
      `
      ${InputContainer} {
        border-color: #CC3993;
      }
    `,
    )}
    
    ${styledIf(
      props.disabled,
      `
      opacity: 0.33;
              
      ${InputContainer} {
        border-color: #9CA3AF;
      }

      ${InputValue} {
        color: #C1C1C8;
      }
    `,
    )}
  `}
`;
