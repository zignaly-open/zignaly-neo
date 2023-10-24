import { Box, styled } from '@mui/material';

export const ButtonsWrapper = styled(Box)`
  display: flex;
  position: fixed;
  bottom: 56px;
  height: 60px;
  width: 100%;
  padding: 10px 3px 5px 3px;
  justify-content: center;
  align-items: center;
  gap: 5px;
  background-color: #060819;
`;
export const TableWrapper = styled(Box)`
  td {
    @media (max-width: ${({ theme }) => theme.breakpoints.values.md}px) {
      padding: 0;
    }
  }
`;
