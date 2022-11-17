import { styled } from '@mui/material';
import { Typography } from '@zignaly-open/ui';

export const Layout = styled('div')`
  display: flex;
  align-items: center;
  gap: 22px;
`;

export const Data = styled('div')`
  display: flex;
  flex-direction: column;
`;

export const Inline = styled('div')`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 22px;
`;

export const TypeText = styled(Typography)`
  display: flex;
  gap: 4px;

  span:nth-of-type(1) {
    color: ${({ theme }) => theme.palette.neutral300};
  }

  span:nth-of-type(2) {
    color: ${({ theme }) => theme.palette.neutral200};
  }
`;

export const List = styled('ul')`
  user-select: none;
`;

export const Item = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px;
  cursor: pointer;

  & > :first-child {
    margin-right: 12px;
  }
`;

export const InternalName = styled(Typography)`
  text-overflow: ellipsis;
  overflow: hidden;
`;
