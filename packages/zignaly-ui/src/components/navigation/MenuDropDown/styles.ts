// Dependencies
import styled from "styled-components";
import {styledIf} from "../../../utils/styled";

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
    ${(props: any) => (`
      fill: ${props.theme.neutral300};
    `)}
    width: 100%;
    height: 100%;
  }
`;

type ButtonProps = {
  center?: boolean,
  isActiveDropDown: boolean,
  focused: boolean
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
  
  ${({center, theme, isActiveDropDown, focused}) => (`
    background: ${theme.dropDownBackground};
    border: 1px solid #222249;
    
    ${styledIf(focused, `
      border-bottom: 1px solid ${theme.secondary};
      
      span {
        color: ${theme.secondary};
      }
    `, `
      span {
        color: ${theme.neutral300};
      }
    `)}
    
    ${styledIf(isActiveDropDown, `
      ${ArrowIcon} {
        transform: rotate(-180deg);
      }
    `)}
    
    ${styledIf(center, `
      ${Field} {
        text-align: center;
      }
    `)}
  `)}
`;


export const DropDown = styled.div<any>`
  top: 100%;
  left: 0;
  right: 0;
  position: absolute;
  width: 100%;
  overflow: auto;

  /* width */
  &::-webkit-scrollbar {
    width: 6px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.10);
    border-radius: 12px;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.15);
  }
  
  ${(props: any) => (`
    background: ${props.theme.dropDownBackground};
    max-height: ${props.maxHeight ?? '200px'};
  `)}

  box-shadow: 0px 5px 11px rgba(11, 13, 26, 0.25);
  border-radius: 0 0 5px 5px;
`;
