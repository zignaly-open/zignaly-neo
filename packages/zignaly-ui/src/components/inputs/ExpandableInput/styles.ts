import styled from "styled-components";
import { styledIf } from "utils/styled";

export const Icon = styled.div`
  padding: 11px 14px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Field = styled.div`
  display: flex;
  height: 36px;
  flex: 1;
`;

export const Input = styled.input`
  display: flex;
  height: 36px;
  background: transparent;
  border: none;
  outline: none;
  color: #fff;
  padding-right: 0;
  width: 0;
  transition: all 0.3s;
  opacity: 0;
  visibility: hidden;
`;

export const Layout = styled.div<any>`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid #35334a;
  background: rgba(16, 18, 37, 0.3);
  border-radius: 5px;

  ${({ isActive, theme }) => `
    ${styledIf(
      isActive,
      `
       cursor: text;
       
       ${Icon} svg {
        color: ${theme.neutral100};
       }
          
       ${Input} {
        padding-right: 14px;
        width: 200px;
        opacity: 1;
        visibility: visible;
        color: ${theme.neutral100};
       }
    `,
      `
       cursor: pointer;
       
      ${Icon} svg {
        color: ${theme.neutral300};
       }
       
      ${Input} {
        color: ${theme.neutral300};
      }
    `,
    )}
  `}
`;
