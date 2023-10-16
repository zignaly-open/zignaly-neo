import { styled, Box } from '@mui/material';

export const ItemContainer = styled(Box)`
  display: grid;
  align-items: end;
  height: 100%;
`;

export const Table = styled('table')`
  margin-top: 16px;
  width: 70%;
  background-image: radial-gradient(
    circle at center,
    rgba(16, 13, 70, 0.4) 0%,
    rgba(16, 25, 70, 0.4) 27%,
    transparent 51%
  );
  /* > tr > td:first-child {
    min-width: 165px;
  }
  > tr > td:not(td:first-child) {
    width: 70px;
    > div {
      width: 70px;
    }
  } */
`;
