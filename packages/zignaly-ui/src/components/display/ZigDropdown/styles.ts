import styled, { css } from "styled-components";
import { styledIf } from "utils/styled";
import { ReactComponent as ArrowBottomIcon } from "assets/icons/caret-down.svg";
import { Theme } from "@mui/system";

const withSeparator = (props: WithSeparator & { theme: Theme }) =>
  props.separator &&
  css`
    border-top: 1px dotted ${props.theme.palette.neutral600};
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
  color: ${({ theme }) => theme.palette.neutral200};
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

  ${({ notClickable, theme }) =>
    !notClickable &&
    css`
      &:hover {
        background: ${theme.backgrounds.socialNetworksTab};
      }
    `}

  ${({ active, theme }) => `
    ${styledIf(
      active,
      `
      color: ${theme.palette.highlighted};
    `,
      `

      &:not([disabled]) {
        cursor: pointer;

        &:hover {
          color: ${theme.palette.neutral000};
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
    &:last-child {
      margin-top: 6px;
    }
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
  ${({ active, theme }) =>
    active &&
    css`
      background: ${theme.backgrounds.dropdown2ndLevel};
      /* When the menu is expanded, replace bottom margin with padding to fit the background until the bottom */
      margin-bottom: 0 !important;
      padding-bottom: 12px;
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
