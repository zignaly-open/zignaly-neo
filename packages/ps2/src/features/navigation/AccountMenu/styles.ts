import styled from 'styled-components';
import { Typography } from '@zignaly-open/ui';

export const NavList = styled.div`
  display: flex;
  flex-direction: column;

  border-bottom: 1px solid #2c2d59;
  padding: 12px 0;
  gap: 8px;

  &:first-child {
    padding-top: 0;
  }

  &.last {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

export const LoginButton = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  cursor: pointer;

  ${({ theme }) => `
    svg {
      color: ${theme.neutral300};
    }
  `}
`;

export const AccountDropDown = styled.div`
  min-width: 220px;
`;

export const AccountName = styled(Typography)`
  max-width: 155px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const AccountDropdown = styled.div`
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

export const LogoutButtonWrap = styled.div`
  & > button {
    width: 100%;
  }
`;
