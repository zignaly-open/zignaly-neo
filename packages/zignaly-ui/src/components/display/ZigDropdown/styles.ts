import styled, { css } from "styled-components";
import { styledIf } from "utils/styled";
import { ReactComponent as ArrowBottomIcon } from "assets/icons/caret-down.svg";
import dark from "theme/dark";

const withSeparator = (props: WithSeparator) =>
  props.separator &&
  css`
    border-top: 1px dotted ${({ theme }) => theme.neutral600};
    margin: 6px 35px 6px;
  `;

type WithSeparator = { separator?: boolean };
type WithCustomStyle = { customStyle?: string };

export const ZigDropdownContainer = styled.div`
  user-select: none;
  min-width: 245px;
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

export const ComponentWrapper = styled.div<WithSeparator & WithCustomStyle>`
  padding: 6px 32px;

  ${(props) => props.customStyle || ""};
  ${withSeparator}
`;

export const NavLink = styled.span<
  {
    notClickable?: boolean;
    active?: boolean;
    disabled?: boolean;
    customStyle?: string;
  } & WithSeparator &
    WithCustomStyle
>`
  color: ${dark.neutral200};
  font-weight: 400;
  font-size: 14px;
  line-height: 28px;
  padding: 6px 32px;
  letter-spacing: 0.55px;
  text-decoration: none;
  transition: 0.15s linear;

  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  overflow: hidden;
  max-width: 245px;

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

  ${(props) => props.customStyle || ""};
  ${withSeparator};
`;

export const ComponentSeparator = styled.div<
  WithSeparator & {
    customStyle?: string;
  }
>`
  ${withSeparator};
  ${(props) => props.customStyle || ""};
`;

export const NavList = styled.div`
  display: flex;
  flex-direction: column;
  > *:first-child {
    margin-top: 11px;
  }
  > *:last-child {
    margin-bottom: 6px;
  }
`;

export const SubNavList = styled.div`
  display: flex;
  flex-direction: column;
  > *:first-child {
    margin-top: 6px;
  }
  > *:last-child {
    margin-bottom: 6px;
  }
`;

export const ChildContainer = styled.div<{ active: boolean } & WithSeparator>`
  ${(props) =>
    props.active &&
    css`
      background: rgb(25, 26, 48);
      margin-bottom: 0 !important;
    `}

  ${withSeparator}
`;

export const SpaceTaker = styled.span`
  display: flex;
  flex: 1;
`;

export const ArrowBottomIconStyled = styled(ArrowBottomIcon)<{ rotated?: boolean }>`
  transition: 0.15s linear;
  transform: rotate(${(props) => (props.rotated ? "180deg" : "0deg")});
`;
