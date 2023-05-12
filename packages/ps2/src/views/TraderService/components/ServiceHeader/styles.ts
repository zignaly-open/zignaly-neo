import { styled } from '@mui/material';
import { MenuDropDown } from '@zignaly-open/ui';

export const Layout = styled('div')`
  flex-direction: row;
  position: fixed;
  top: 52px;
  width: 100%;
  right: 0;
  left: 0;
  background: #0f0f25;
  z-index: 50;
`;

export const Container = styled('div')`
  display: grid;
  grid-template-columns: 25% repeat(4, minmax(0%, 100%));

  > div:first-of-type {
    border-left: 1px dotted ${({ theme }) => theme.palette.neutral600};
  }

  > div:first-of-type,
  > div:last-of-type {
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

export const Option = styled('a')<OptionType>`
  cursor: pointer;
  user-select: none;
  ${({ theme, active }) =>
    active
      ? `
        color: ${theme.palette.highlighted};
      `
      : `
        color: ${theme.palette.neutral300};

        &:hover {
          color: ${theme.palette.neutral100};
        }
      `}

  &:hover {
    ${({ theme }) =>
      `
      background: ${theme.palette.neutral700};
    `}
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
  background: #0f0f25;

  ${({ isSubOption, theme }) =>
    isSubOption
      ? `
        padding: 0 10px 0 54px;
      `
      : `
        border-right: 1px dotted ${theme.palette.neutral600};
        justify-content: center;
      `}
`;

export const ServiceDropDown = styled(MenuDropDown)`
  .MuiTypography-h3 {
    color: ${({ theme }) => theme.palette.neutral100};
  }
`;
