import { Box, styled } from '@mui/material';

export const Wrapper = styled(Box)`
  position: absolute;
  display: flex;
  top: 44px;
  left: 0;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.palette.neutral400};
  z-index: -10;
  border-radius: 10px;
  padding: 0 10px 8px 10px;
  transform: scale(1.05);
  white-space: nowrap;
`;

export const Card = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'status',
})<{ status: 'blocked' | 'active' | 'accessible' }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: ${({ status }) => (status === 'blocked' ? 0.5 : 1)};
  background-color: ${({ status, theme }) =>
    status === 'active'
      ? `${theme.palette.neutral600}`
      : `${theme.palette.neutral700}`};
  border-radius: 10px;
  padding: 16px 20px;
  border: ${({ status, theme }) =>
    status === 'active' ? `2px solid ${theme.palette.neutral500}` : 'unset'};

  transform: ${({ status }) => (status === 'active' ? 'scale(1.05)' : 'unset')};
  position: relative;
`;
