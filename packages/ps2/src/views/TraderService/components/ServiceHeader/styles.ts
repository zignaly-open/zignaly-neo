import { styled } from '@mui/material';
import { MenuDropDown } from '@zignaly-open/ui';

export const Layout = styled('div')`
  flex-direction: row;
  position: fixed;
  top: 52px;
  width: 100%;
  right: 0;
  left: 0;
  background: #12152c;
  z-index: 50;
`;

export const Container = styled('div')`
  display: grid;
  grid-template-columns: 25% repeat(5, minmax(0%, 100%));

  > div:first-of-type {
    border-left: 1px dashed ${({ theme }) => theme.palette.neutral600};
  }

  > div:first-of-type,
  > div:last-of-type {
    border-right: 1px dashed ${({ theme }) => theme.palette.neutral600};
  }
`;

export const Options = styled('nav')`
  display: flex;
  flex-direction: column;
  padding: 30px 34px;
  gap: 14px;
`;

type OptionType = {
  active: boolean;
};

export const Option = styled('a')<OptionType>`
  cursor: pointer;
  user-select: none;
  color: ${({ theme, active }) =>
    active ? theme.palette.highlighted : theme.palette.neutral300};

  &:hover {
    color: ${({ theme }) => theme.palette.neutral100};
    background: ${({ theme }) => theme.palette.neutral700};
  }
`;

export const HeadOption = styled(Option)<
  OptionType & { isSubOption?: boolean }
>`
  display: flex;
  align-items: center;
  height: 56px;
  background: #12152c;

  ${({ isSubOption, theme }) =>
    isSubOption
      ? `
        padding: 0 10px 0 30px;
      `
      : `
        border-right: 1px dashed ${theme.palette.neutral600};
        justify-content: center;
      `}
`;

export const ServiceDropDown = styled(MenuDropDown)`
  .MuiTypography-h3 {
    color: ${({ theme }) => theme.palette.neutral100};
  }
`;
