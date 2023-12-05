import { Box, styled } from '@mui/material';

export const ButtonsWrapper = styled(Box)`
  display: flex;
  position: fixed;
  bottom: calc(68px + env(safe-area-inset-bottom));
  height: 60px;
  width: 100%;
  padding: 10px 3px 5px 3px;
  justify-content: center;
  align-items: center;
  gap: 5px;
  background-color: ${({ theme }) =>
    theme.palette.backgrounds.mobileButtonsWrapper};
`;
export const TableWrapper = styled(Box)`
  td {
    @media (max-width: ${({ theme }) => theme.breakpoints.values.md}px) {
      padding: 0 !important;
    }
  }
`;
