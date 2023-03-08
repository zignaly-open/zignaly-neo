import { Box, styled } from '@mui/material';

export const Card = styled(Box)`
  width: 322px;
  height: 234px;
  padding: 16px;
  border-radius: 16px;
  border: solid 1px ${({ theme }) => theme.palette.neutral600};
  background-color: #121129;
  align-items: center;
  display: flex;
  flex-direction: column;
  text-align: center;
`;
