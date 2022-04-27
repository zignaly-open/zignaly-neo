// Dependencies
import styled from "styled-components";
import { styledIf } from "utils/styled";

export const InputValue = styled.input`
  padding-right: 22px;
  background: transparent;
  border: none;
  color: #f3f4f6;
  outline: none;
  font-weight: 400;
  font-size: 15px;
  line-height: 40px;
  letter-spacing: 0.66px;
  width: 100%;
  font-family: "Avenir", sans-serif;
`;

export const Side = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1;

  &:last-child:not(:first-child) {
    flex: 0;
    width: auto;
  }
`;

export const Label = styled.label`
  font-family: "Avenir", sans-serif;
  font-weight: 500;
  font-size: 15px;
  line-height: 24px;
  letter-spacing: 0.55px;
  color: #a9a9ba;
`;

export const InputContainer = styled.div`
  border: 1px solid #35334a;
  padding: 8px 24px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  background: rgba(16, 18, 37, 0.7);
  margin-top: 4px;
  gap: 22px;
  margin-bottom: 10px;
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
