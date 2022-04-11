// Dependencies
import styled from "styled-components";
import { styledIf } from "../../../utils/styled";

export const Caption = styled.div`
  z-index: 2;
  position: relative;
  transition: color 0.2s linear;
  color: #26c4c1;
`;

export const Container = styled.div`
  position: relative;
  transition: all 0.2s linear;
  outline: none;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const LeftElement = styled.div`
  z-index: 3;
  position: relative;
  padding-right: 10px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const RightElement = styled(LeftElement)`
  padding-right: 0;
  padding-left: 10px;
`;

/**
 * Icons
 */
interface IconProps {
  src: any;
  alt: any;
}

export const Icon = styled.img<IconProps>``;

export const CenterIcon = styled.img<IconProps>`
  position: relative;
  top: 1px;
`;

/**
 * Layout
 */
interface LayoutProps {
  withElements: Boolean;
  underline: Boolean;
}

export const Layout = styled.button<LayoutProps>`
  border: none;
  cursor: pointer;
  padding: 2px;
  outline: none;

  position: relative;
  user-select: none;
  background: transparent;

  transition: all 0.2s linear;

  ${({ withElements, underline }) => `
      
      ${Container} {
        padding: 8px 18px;
        min-width: 88px;      
      }
            
      ${styledIf(
        withElements,
        `
        ${Container} {
          padding: 8px 18px;
        }
      `,
      )}
      ${styledIf(
        underline,
        `
      ${Caption} { 
            font-size: 13px;
            font-style: normal;
            font-weight: 400;
            line-height: 15px;
            letter-spacing: 0px;
            text-align: center;
            text-decoration-color: #26C4C1;
            text-decoration-line: underline;
         `,
      )}
    ${styledIf(
      !underline,
      `
      ${Caption} { 
            font-size: 13px;
            font-style: normal;
            font-weight: 400;
            line-height: 15px;
            letter-spacing: 0px;
            text-align: center;
         `,
    )}
      
      ${LeftElement} {
        img {
          width: 10px;
        }
      }
  `}
`;
