import { AppBar } from '@mui/material';
import { styled } from '@mui/system';
import { MarginContainer } from '@zignaly-open/ui';

export const StyledAppBar = styled(AppBar)`
  background: linear-gradient(269.14deg, #080810 0%, #11122b 100%);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  flex-direction: row;
  height: 52px;
  border: none;
`;

export const Container = styled(MarginContainer)`
  display: flex;
  justify-content: space-between;
`;
