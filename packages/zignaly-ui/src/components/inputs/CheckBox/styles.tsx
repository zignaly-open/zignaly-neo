import styled from "styled-components";
import { styledIf } from "utils/styled";

import { ReactComponent as CheckmarkIcon } from "assets/icons/checkmark-active-icon.svg";
import muiStyled from "@emotion/styled";
import ZigTypography from "../../display/ZigTypography";

export const Icon = styled(CheckmarkIcon)`
  width: 10px;
  height: 10px;
  position: relative;
  transition: transform 0.05s linear;
  transform: scale(0);
`;

export const Label = muiStyled(ZigTypography)`
  font-weight: 400;
  margin: 0 12px;
`;

export const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.palette.neutral800};
  border: 1px dotted ${({ theme }) => theme.palette.neutral400};
  border-radius: 2.5px;
  position: relative;
  flex: 0 0 18px;
  width: 18px;
  height: 18px;
  overflow: hidden;
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

  ${({ isActive, theme }) => `
    ${styledIf(
      isActive,
      `
      ${Box} {
        border-color: ${theme.palette.neutral400};
        color: ${theme.palette.highlighted};
      }
      ${Icon} {
        transform: scale(1) !important;
        fill: ${theme.palette.highlighted};
      }
    `,
    )}
    
    &[disabled] {
      cursor: default;
      
      ${Icon} {
        filter: grayscale(100%);
      }
      
      ${Label} {
        color: ${theme.palette.labelCheckbox};
      }
  
      ${Box} {
        border-color: ${theme.palette.checkboxPrimary} !important;
        
        ${styledIf(
          isActive,
          `
          box-shadow: 0 0 0 1px ${theme.palette.checkboxPrimary};
        `,
        )}
      }
    }
  `}
`;
