import styled from "styled-components";
import { styledIf } from "utils/styled";

export const DropDownContainer = styled.div`
  user-select: none;
  padding: 18px;
`;

export const Component = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
`;

export const NavLink = styled.span<{ active?: boolean; disabled?: boolean }>`
  color: #706f82;
  font-weight: 500;
  font-size: 14px;
  line-height: 28px;
  letter-spacing: 0.55px;
  text-decoration: none;
  transition: 0.15s linear;

  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  overflow: hidden;

  svg {
    transition: 0.15s linear;
  }

  ${({ active }) => `
    ${styledIf(
      active,
      `
      color: #7682f7;
    `,
      `

      &:not([disabled]) {
        cursor: pointer;

        &:hover {
          color: #fff;
        }
      }
    `,
    )}
  `}
`;

export const NavList = styled.div`
  display: flex;
  flex-direction: column;

  padding: 12px 0;
  gap: 8px;
`;
