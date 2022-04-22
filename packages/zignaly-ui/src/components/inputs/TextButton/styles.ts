// Dependencies
import styled from "styled-components";
import { styledIf } from "../../../utils/styled";

export const Container = styled.div`
  position: relative;
  transition: all 0.2s linear;
  outline: none;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: #26c4c1;
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
  color: #26c4c1;
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
  underline?: Boolean;
}

export const Layout = styled.button<LayoutProps>`
  border: none;
  cursor: pointer;
  padding: 2px;
  outline: none;
  position: relative;
  user-select: none;
  background: transparent;
  ${(props) => `
      
      ${Container} {
        padding: 8px 18px;
        min-width: 88px;  
        font-size: 13px;
            font-style: normal;
            font-weight: 400;
            line-height: 20px;
            letter-spacing: 0px;
            text-align: center;    
      }
            
      ${styledIf(
        props.withElements,
        `
        ${Container} {
          padding: 8px 18px;
        }
      `,
      )}
      ${styledIf(
        props.underline,
        `
      ${Container} { 
            text-decoration-color: #26C4C1;
            text-decoration-line: underline;
         `,
      )}
    ${styledIf(
      !props.underline,
      `
      ${Container} { 
        text-decoration-line: none;
         `,
    )}
      
      ${LeftElement} {
        img {
          width: 8px;
          height: 8px;
        }
      }
      
  `}
`;
