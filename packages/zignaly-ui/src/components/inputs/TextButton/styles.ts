// Dependencies
import styled from "styled-components";
import { styledIf } from "../../../utils/styled";

export const Container = styled.div`
  position: relative;
  transition: all 0.2s linear;
  outline: none;
  display: inline-flex;
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
`;

export const CenterIcon = styled.div`
  position: relative;
  top: 1px;
`;

/**
 * Layout
 */
interface LayoutProps {
  withElements: boolean;
  underline?: boolean;
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
        letter-spacing: 0.55px;
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
          text-decoration-color: #26C4C1;
          text-decoration-line: underline;
        `,
        `
          text-decoration-line: none;
        `,
      )}
      
      ${LeftElement} {
        img {
          width: 12px;
          height: 12px;
        }
      }
      
  `}
`;
