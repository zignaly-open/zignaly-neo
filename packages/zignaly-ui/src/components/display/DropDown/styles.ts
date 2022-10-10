import styled, { css } from "styled-components";
import { styledIf } from "utils/styled";
import { ReactComponent as ArrowBottomIcon } from "assets/icons/arrow-bottom-icon.svg";

const withSeparator = (props: WithSeparator) =>
  props.separator &&
  css`
    border-top: 1px solid rgb(44, 45, 89);
  `;

type WithSeparator = { separator?: boolean };

export const DropDownContainer = styled.div`
  user-select: none;
`;

export const Component = styled.div`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
`;

export const ComponentWrapper = styled.div<WithSeparator>`
  padding: 12px 18px;
  ${withSeparator}
`;

export const NavLink = styled.span<
  { notClickable?: boolean; active?: boolean; disabled?: boolean } & WithSeparator
>`
  color: #706f82;
  font-weight: 500;
  font-size: 14px;
  line-height: 28px;
  padding: 12px 18px;
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

  ${({ notClickable }) =>
    !notClickable &&
    css`
      &:hover {
        background: rgb(28, 29, 53);
      }
    `}

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

  ${(props) =>
    props.notClickable &&
    css`
      cursor: default !important;
    `}
  ${withSeparator};
`;

export const NavList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ChildContainer = styled.div<{ active: boolean } & WithSeparator>`
  ${(props) =>
    props.active &&
    css`
      background: rgb(25, 26, 48);
    `}

  ${withSeparator}
`;

export const SpaceTaker = styled.span`
  display: flex;
  flex: 1;
`;

export const ArrowBottomIconStyled = styled(ArrowBottomIcon)`
  transition: 0.15s linear;
`;
