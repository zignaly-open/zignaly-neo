// Dependencies
import Typography from "components/display/Typography";
import styled from "styled-components";
import { dark } from "theme";
import { styledIf } from "utils/styled";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

export const InputContainer = styled.div`
  border: 1px solid #35334a;
  padding: 8px 18px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  background: rgba(16, 18, 37, 0.7);
  margin-top: 4px;
  margin-bottom: 8px;
  gap: 22px;
  width: 100%;
`;

export const TokenImage = styled.img`
  max-width: 33px;
  margin-right: 20px;
`;

export const InputValue = styled.input`
  padding-right: 22px;
  background: transparent;
  border: none;
  color: ${dark["neutral100"]};
  outline: none;
  font-weight: 500;
  font-size: 15px;
  line-height: 24px;
  letter-spacing: 0.55px;
  width: 100%;
  font-family: "Avenir Next", sans-serif;
`;

export const BalanceContainer = styled.div`
  margin-bottom: 16px;
`;

export const BalanceLabel = styled(Typography)`
  padding-right: 4px;
  font-weight: 600;
  color: ${({ theme }) => theme.neutral200};
`;

export const BalanceValue = styled(Typography)`
  color: ${({ theme }) => theme.neutral000};
  font-weight: 600;
`;

export const MaxButton = styled.div`
  border: 1px solid #35334a;
  padding: 8px 18px;
  background: #1012254d;
  color: #89899a;
  border-radius: 6px;

  font-style: normal;
  font-weight: 600;
  font-size: 11px;
  line-height: 12px;
  letter-spacing: 1.1px;
  user-select: none;
  cursor: pointer;
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

export const Selector = styled.div``;

type LayoutProps = {
  withError: boolean;
  disabled: boolean;
  fullWidth?: boolean;
};

export const Layout = styled.div`
  display: flex;
  flex-direction: column;

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
      
      ${MaxButton} {
        cursor: default;
        border-color: #9CA3AF;
        color: #9CA3AF;
      }
      
      ${InputValue} {
        color: #C1C1C8;
      }
    `,
    )}
    
    ${styledIf(
      props.fullWidth,
      `
      width: 100%;
      `,
    )}
  `}
`;

export const Unit = styled.div`
  margin: 10px 0 0 24px;
`;
