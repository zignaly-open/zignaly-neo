import { styled } from '@mui/material';
import { ZigTypography } from '@zignaly-open/ui';

export const HeaderDropdownButton = styled('button')<{ active: boolean }>`
  appearance: none;
  border: none;
  height: 56px;
  padding-left: 15px;
  padding-right: 15px;
  text-align: center;
  background: ${(props) => (props.active ? '#12152c' : 'transparent')};
  transition: background-color 0.2s;
  border-radius: 0;
`;

export const LoginButton = styled('span')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  cursor: pointer;

  ${({ theme }) => `
    svg {
      color: ${theme.palette.neutral300};
    }
  `}
`;

export const AccountName = styled(ZigTypography)`
  max-width: 155px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const AccountDropdown = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding-top: 7px;
  padding-bottom: 7px;
  overflow: hidden;

  span {
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
