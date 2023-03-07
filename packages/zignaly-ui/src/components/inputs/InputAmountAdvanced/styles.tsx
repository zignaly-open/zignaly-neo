import Typography from "components/display/Typography";
import styled from "styled-components";
import { styledIf } from "../../../utils/styled";
import { dark } from "../../../theme";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

export const InputContainer = styled.div`
  position: relative;
  border: 1px solid #35334a;
  padding: 8px 18px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  background: rgba(16, 18, 37, 0.7);
  margin-top: 4px;
  gap: 22px;
  width: 100%;
  overflow: hidden;
`;

export const InputValue = styled.input`
  padding: 0 16px 0 4px;
  background: transparent;
  border: none;
  color: ${dark.neutral100};
  outline: none;
  font-weight: 500;
  font-size: 22px;
  line-height: 36px;
  letter-spacing: 0.55px;
  width: 100%;
  font-family: "Avenir Next", sans-serif;
`;

export const BalanceLabel = styled(Typography)`
  padding-right: 4px;
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
  position: relative;
  z-index: 3;
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

type LayoutProps = {
  withError: boolean;
  disabled: boolean;
  fullWidth?: boolean;
  children: React.ReactNode[] | React.ReactNode;
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

export const Unit = styled.div<{ widthCharacters: number }>`
  position: absolute;
  pointer-events: none;
  z-index: 1;
  left: calc(20px + 32px + 13.31px + 13.31px * ${({ widthCharacters }) => widthCharacters});
`;

export const UnitInvisible = styled.div`
  width: 98px;
  height: 100%;
  background: rgb(16 18 37);
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 2;
`;

export const InputField = styled.div`
  display: flex;
  flex: 1;
  padding-left: 8px;
`;
