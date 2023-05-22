import { Box, styled } from '@mui/material';

export const Icon = styled('div')`
  margin-left: 8px;
  height: 21.5px;
  width: 23.5px;
  margin-top: -7px;

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const PriceBoxOverride = styled(Box)`
  span {
    ${(props) => `color: ${props.theme.palette.neutral000}`} !important;
    position: relative;
  }
`;
