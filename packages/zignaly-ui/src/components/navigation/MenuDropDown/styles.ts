import styled from "styled-components";
import { styledIf } from "../../../utils/styled";

export const Layout = styled.div`
  position: relative;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;

  span {
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
    display: block;
  }
`;

export const ArrowIcon = styled.div`
  transition: all 0.15s linear;
  transform-origin: center;
  width: 28px;
  height: 28px;

  svg {
    ${(props: any) => `
      fill: ${props.theme.palette.neutral300};
    `}
    width: 100%;
    height: 100%;
  }
`;

type ButtonProps = {
  center?: boolean;
  isActiveDropDown: boolean;
  focused: boolean;
};

export const Button = styled.div<ButtonProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 22px;
  padding: 14px 28px;
  justify-content: space-between;
  user-select: none;
  height: 56px;
  cursor: pointer;
  background: ${({ theme }) => theme.backgrounds.secondaryBackground};

  ${({ center, theme, isActiveDropDown, focused }) => `    
    ${styledIf(
      focused,
      `
      span {
        color: ${theme.palette.highlighted};
      }
    `,
      `
      span {
        color: ${theme.palette.neutral300};
      }
    `,
    )}
    
    ${styledIf(
      isActiveDropDown,
      `
      background: ${theme.palette.neutral800};
      border-color: transparent !important;

      ${ArrowIcon} {
        transform: rotate(-180deg);
      }
    `,
    )}
    
    ${styledIf(
      center,
      `
      ${Field} {
        text-align: center;
      }
    `,
    )}
  `}
`;

export const DropDown = styled.div<any>`
  top: 100%;
  left: 0;
  right: 0;
  position: absolute;
  width: 100%;
  overflow: auto;

  ${(props: any) => `
    background: ${props.theme.palette.neutral800};
    max-height: ${props.maxHeight ?? "200px"};
  `}

  border-radius: 0 0 8px 8px;
  border-top: 1px solid ${({ theme }) => theme.palette.neutral700}80;
`;
