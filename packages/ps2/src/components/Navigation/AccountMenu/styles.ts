import { styled } from '@mui/material';
import { ZigTypography } from '@zignaly-open/ui';

export const HeaderDropdownButton = styled('button', {
  shouldForwardProp: (p) => p !== 'active',
})<{ active?: boolean }>`
  appearance: none;
  cursor: pointer;
  border: none;
  height: 49px;
  margin-top: 4px;
  padding-bottom: 4px;
  padding-left: 15px;
  padding-right: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  text-align: center;
  background: ${(props) => (props.active ? '#12152c' : 'transparent')};

  &:hover {
    background: #12152c;
  }

  transition: background-color 0.2s;
  border-radius: ${(props) => (props.active ? '5px 5px 0 0' : '5px')};
`;

export const LoginButton = styled('span')`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4px;
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
  font-size: 14px;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const AccountDropdown = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding-top: 12px;
  padding-bottom: 12px;
  overflow: hidden;

  span {
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
