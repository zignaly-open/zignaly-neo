import { styled } from "@mui/material";
import { Box, Theme, css } from "@mui/system";
import { lighten } from "@mui/material/styles";
import { NavLink, ZigMenuItem } from "components/display/ZigDropdown/styles";

// FIXME
const secondaryBackground = ({ theme }: { theme: Theme }) => `
  background: ${lighten(theme.palette.neutral900, (0x0f - 0x05) / 0xff)};
  background: ${theme.palette.backgrounds.secondaryBackground};
`;

export const Layout = styled("div")`
  flex-direction: row;
  position: sticky;
  top: var(--header-height, 52px);
  width: 100%;
  right: 0;
  left: 0;
  ${secondaryBackground};
  z-index: 50;
`;

export const Container = styled(Box)`
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  & > * {
    flex: 1;
    border-right: 1px dotted ${({ theme }) => theme.palette.neutral600};
    padding: 6px 32px;
  }
  &:first-child {
    border-left: 1px dotted ${({ theme }) => theme.palette.neutral600};
  }
`;

type OptionType = {
  active: boolean;
};

export const Option = styled("span", {
  shouldForwardProp: (p) => p !== "active",
})<OptionType>`
  cursor: pointer;
  user-select: none;
  transition: background-color 0.2s;

  & > * {
    transition: color 0.2s;
    color: ${({ theme, active }) =>
      active ? theme.palette.highlighted : theme.palette.neutral300};
  }

  &:hover {
    background: ${({ theme }) => theme.palette.backgrounds.manageServiceMenuHover};
    background: ${({ theme }) => lighten(theme.palette.neutral750, (0x1b - 0x16) / 0xff)};
    & > * {
      color: ${({ theme }) => theme.palette.neutral100};
    }
  }
`;

export const HeadOption = styled("span")<OptionType & { isSubOption?: boolean }>`
  display: flex;
  align-items: center;
  min-height: 56px;
  ${secondaryBackground};

  ${({ isSubOption, theme }) =>
    isSubOption
      ? `
              background: ${theme.palette.neutral800};
      `
      : `
        padding: 4px;
        justify-content: center;
      `}
`;
export const ZigMenuItemSubHeader = styled(ZigMenuItem)<{ isSubOption: boolean; dense?: boolean }>`
  ${({ isSubOption, theme }) =>
    !isSubOption &&
    css`
      display: flex;
      justify-content: center;

      span {
        overflow-x: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      border-right: 1px dotted ${theme.palette.neutral600};
    `}/* ${({ dense }) =>
    !dense
      ? css`
          height: 56px;
          padding: 6px 20px;
        `
      : css`
          padding: 7px 34px;
        `} */
`;

export const NavLinkStyled = styled(NavLink)<{ isSubOption: boolean }>`
  max-width: none;

  ${({ isSubOption, theme }) =>
    !isSubOption &&
    css`
      height: 56px;

      span {
        overflow-x: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      &:not(:last-of-type) {
        border-right: 1px dotted ${theme.palette.neutral600};
      }
    `}
`;

export const MenuLink = styled("a")<{ isSubOption: boolean }>`
  ${({ isSubOption, theme }) =>
    !isSubOption &&
    `
  &:not(:last-of-type) {
      border-right: 1px dotted ${theme.palette.neutral600};
  }
  `}
`;

export const Field = styled("div")`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;

  span {
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
    display: block;
  }
`;

export const ArrowIcon = styled("div")`
  transition: all 0.15s linear;
  transform-origin: center;
  width: 28px;
  height: 28px;

  svg {
    ${(props: any) => `
      fill: ${props.theme.palette.neutral300};
    `}
    width: 100%;
    height: 100%;
  }
`;

export const ButtonTest = styled("div")`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 22px;
  padding: 14px 28px;
  justify-content: space-between;
  user-select: none;
  height: 56px;
  cursor: pointer;
  ${secondaryBackground};

  ${({ center, theme, isActiveDropDown, focused }) => `
    span {
      color: ${focused ? theme.palette.highlighted : theme.palette.neutral300};
    }
    
    ${
      isActiveDropDown
        ? `
      background: ${theme.palette.neutral800};
      box-shadow: 1px 0 ${theme.palette.backgrounds.secondaryBackground}, -1px 0 ${theme.palette.backgrounds.secondaryBackground};
      border-color: transparent !important;

      svg, ${ArrowIcon} {
      transform: rotate(-180deg);
      }
    `
        : ""
    }
    
    ${
      center
        ? `
      ${Field} {
      text-align: center;
      }
    `
        : ""
    }
    `}
`;
