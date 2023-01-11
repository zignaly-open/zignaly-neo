import { styled } from '@mui/material';
import { ZigSelect } from '@zignaly-open/ui';

export const StyledZigSelect = styled(ZigSelect)`
  min-width: 150px;

  && {
    .zig-react-select {
      &__control {
        padding: 0 4px;
        min-height: 40px;
      }

      &__value-container {
        text-align: center;
      }

      &__single-value {
        font-weight: 600;
        font-size: 11px;
        color: ${({ theme }) => theme.palette.neutral300} !important;
      }
    }
  }
`;
