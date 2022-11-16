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
