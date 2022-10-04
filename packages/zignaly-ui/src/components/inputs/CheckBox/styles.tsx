import Typography from "components/display/Typography";
import styled from "styled-components";
import { styledIf } from "utils/styled";

import { ReactComponent as CheckmarkIcon } from "assets/icons/checkmark-active-icon.svg";

export const Icon = styled(CheckmarkIcon)`
  width: 10px;
  height: 10px;
  position: relative;
  transition: transform 0.05s linear;
  transform: scale(0);
`;

export const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  background: #101427;
  border: 1px solid #706f82;
  border-radius: 2.5px;
  position: relative;

  width: 18px;
  height: 18px;
  overflow: hidden;
`;

export const Label = styled(Typography).attrs({ variant: "body2", color: "neutral300" })`
  font-weight: 400;
  margin: 0 12px;
`;

type LayoutProps = {
  isActive: boolean;
  disabled: boolean;
};

export const Layout = styled.div<LayoutProps>`
  display: flex;
  cursor: pointer;
  user-select: none;
  align-items: center;

  ${({ isActive }) => `
    ${styledIf(
      isActive,
      `
      ${Box} {
        border-color: #706f82;
        color: #7682f7;
      }
      ${Icon} {
        transform: scale(1) !important;
        fill: #7682f7;
      }
    `,
    )}
    
    &[disabled] {
      cursor: default;
      
      ${Icon} {
        filter: grayscale(100%);
      }
      
      ${Label} {
        color: #4f4f5e;
      }
  
      ${Box} {
        border-color: #2a2a36 !important;
        
        ${styledIf(
          isActive,
          `
          box-shadow: 0 0 0 1px #2a2a36;
        `,
        )}
      }
    }
  `}
`;
