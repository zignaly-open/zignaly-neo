import { styled } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';

export const Table = styled('table')`
  margin: 0 auto;

  td:first-of-type {
    text-align: right;
    padding-right: 8px;
    min-width: 114px;
  }

  td:last-of-type {
    text-align: left;
    min-width: 127px;
  }
`;

export const StyledErrorOutline = styled(ErrorOutline)`
  ${(props) => `color: ${props.theme.neutral300}`};
`;
