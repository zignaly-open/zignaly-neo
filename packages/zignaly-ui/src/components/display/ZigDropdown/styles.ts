import { ReactComponent as ArrowBottomIcon } from "assets/icons/caret-down.svg";
import { styled, Theme, css } from "@mui/system";
import { MenuItem } from "@mui/material";
import { ZigArrowBottomIcon } from "icons";

const withSeparator = (props: WithSeparator & { theme: Theme }) =>
  props.separator &&
  css`
    border-top: 1px dotted ${props.theme.palette.neutral600};
    margin: 6px 35px 6px;
  `;

export const ZigDropdownContainer = styled("div")`
  user-select: none;
  min-width: 245px;
`;

export const Component = styled("div")`
  /* background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit; */
`;

export const ZigMenuItem = styled(MenuItem)<{ active?: boolean; preserveStyles?: boolean }>`
  color: ${({ theme }) => theme.palette.neutral200};
  font-weight: 400;
  font-size: 14px;
  line-height: 28px;
  padding: 6px 32px;
  letter-spacing: 0.55px;
  text-decoration: none;
  gap: 12px;

  ${({ notClickable, theme }) =>
    !notClickable &&
    css`
      &:not([disabled]) {
        &:hover {
          background: ${theme.palette.backgrounds.headerMenuItemHover};
          color: ${theme.palette.neutral000};
        }
      }
    `}
  ${({ preserveStyles = true }) =>
    !preserveStyles &&
    css`
      && {
        gap: 0;
        &:hover {
          background-color: inherit;
          cursor: auto;
        }
      }
    `}
`;

export const NavLink = styled("span")<
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
        background: ${theme.palette.backgrounds.headerMenuItemHover};
      }
    `}

  ${({ active, theme }) => `
  ${
    active
      ? `color: ${theme.palette.highlighted};`
      : `
    &:not([disabled]) {
      cursor: pointer;
      &:hover {
        color: ${theme.palette.neutral000};
      }
    }
  `
  }
`}

  ${(props) =>
    props.notClickable &&
    css`
      cursor: default !important;
    `}

  ${(props) => props.customStyle || ""};
  ${withSeparator};
`;

export const ComponentSeparator = styled("div")<
  WithSeparator & {
    customStyle?: string;
  }
>`
  ${withSeparator};
  ${(props) => props.customStyle || ""};
`;

export const NavList = styled("div")<{ matchAnchorWidth?: boolean }>`
  display: flex;
  flex-direction: column;

  /* remove? */
  ${({ matchAnchorWidth }) =>
    matchAnchorWidth &&
    `
      ${NavLink} {
        max-width: none;
      }
    `}

  > *:first-child {
    margin-top: 6px;
  }
  > *:last-child {
    margin-bottom: 6px;
  }
`;

export const SubNavList = styled("div")`
  display: flex;
  flex-direction: column;
  > *:first-child {
    margin-top: 6px;
  }
  > *:last-child {
    margin-bottom: 6px;
  }
`;

export const ChildContainer = styled("div")<{ active: boolean } & WithSeparator>`
  ${({ active, theme }) =>
    active &&
    css`
      background: ${theme.palette.backgrounds.dropdown2ndLevel};
      /* When the menu is expanded, replace bottom margin with padding to fit the background until the bottom */
      margin-bottom: 0 !important;
      padding-bottom: 12px;
    `}
`;

export const SpaceTaker = styled("span")`
  display: flex;
  flex: 1;
`;

export const ArrowBottomIconStyled = styled(ZigArrowBottomIcon)<{ rotated?: boolean }>`
  transition: 0.15s linear;
  transform: rotate(${(props) => (props.rotated ? "180deg" : "0deg")});
  fill: ${({ theme }) => theme.palette.neutral300};
  font-size: 20px;
`;
