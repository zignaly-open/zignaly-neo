import { Grid, styled } from '@mui/material';

export const InnerGrid = styled(Grid)`
  width: 100%;

  & > * {
    margin: 0 auto;
  }
`;
