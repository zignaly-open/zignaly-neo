import { Box, styled } from '@mui/material';

export const Icon = styled('div')`
  margin-left: 8px;
  width: 24px;
  height: 24px;
  svg {
    width: 100%;
    height: 100%;
  }
`;

export const PriceBoxOverride = styled(Box)`
  span {
    ${(props) => `color: ${props.theme.palette.neutral000}`} !important;
    position: relative;
    top: 2px;
  }
`;
