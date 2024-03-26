import { Box, styled } from '@mui/material';

export const PriceBoxOverride = styled(Box)`
  span {
    ${(props) => `color: ${props.theme.palette.neutral000} !important;`}
    position: relative;
  }
`;
