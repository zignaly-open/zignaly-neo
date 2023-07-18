import { styled } from '@mui/material';
import { MenuDropDown } from '@zignaly-open/ui';
import { Link } from 'react-router-dom';
import { Theme } from '@mui/system';

const secondaryBackground = ({ theme }: { theme: Theme }) => `
  background: ${theme.palette.backgrounds.secondaryBackground};
`;

export const Layout = styled('div')`
  flex-direction: row;
  position: fixed;
  top: 52px;
  width: 100%;
  right: 0;
  left: 0;
  ${secondaryBackground};
  z-index: 50;
`;

export const Container = styled('div')`
  display: grid;
  grid-template-columns: 25% repeat(4, minmax(0%, 100%));

  > div:first-of-type > div:first-of-type,
  > div:last-of-type > div:first-of-type {
    border-left: 1px dotted ${({ theme }) => theme.palette.neutral600};
    border-right: 1px dotted ${({ theme }) => theme.palette.neutral600};
  }
`;

export const Options = styled('nav')`
  display: flex;
  flex-direction: column;
  padding: 25px 0;
`;

type OptionType = {
  active: boolean;
};

export const Option = styled('span', {
  shouldForwardProp: (p) => p !== 'active',
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
    background: ${({ theme }) => theme.palette.neutral750};
    & > * {
      color: ${({ theme }) => theme.palette.neutral100};
    }
  }
`;

export const ServiceOption = styled(Option)`
  padding: 7px 34px;
  display: flex;
`;

export const HeadOption = styled(Option)<
  OptionType & { isSubOption?: boolean }
>`
  display: flex;
  align-items: center;
  height: 56px;
  ${secondaryBackground};

  ${({ isSubOption, theme }) =>
    isSubOption
      ? `
        padding: 0 10%;
        background: ${theme.palette.neutral800};
      `
      : `
        justify-content: center;
      `}
`;

export const MenuLink = styled(Link)<{ isSubOption: boolean }>`
  ${({ isSubOption, theme }) =>
    !isSubOption &&
    `
    &:not(:last-of-type) {
      border-right: 1px dotted ${theme.palette.neutral600};
    }
  `}
`;

export const ServiceDropDown = styled(MenuDropDown)`
  .MuiTypography-h3 {
    color: ${({ theme }) => theme.palette.neutral100};
  }
`;
