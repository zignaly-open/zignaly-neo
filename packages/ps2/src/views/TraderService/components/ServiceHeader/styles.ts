import { styled } from '@mui/material';
import { MenuDropDown } from '@zignaly-open/ui';
import { lighten } from '@mui/material/styles';

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
    background: ${({ theme }) =>
      theme.palette.backgrounds.manageServiceMenuHover};
    background: ${({ theme }) =>
      lighten(theme.palette.neutral750, (0x1b - 0x16) / 0xff)};
    & > * {
      color: ${({ theme }) => theme.palette.neutral100};
    }
  }
`;

export const ServiceOption = styled(Option)`
  padding: 7px 34px;
  display: flex;
`;

export const ServiceDropDown = styled(MenuDropDown)`
  .MuiTypography-h3 {
    color: ${({ theme }) => theme.palette.neutral100};
  }
`;
