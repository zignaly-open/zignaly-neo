import { styled } from '@mui/system';
import { ZigSelect } from '@zignaly-open/ui';
import { VISIBILITY_LABEL } from './types';

export const StyledZigSelect = styled(ZigSelect)`
  && {
    .zig-react-select {
      &__control {
        border: ${({ value }) =>
          `1px solid ${VISIBILITY_LABEL[value as number].color} !important`};
        border-radius: 5px;
      }

      &__single-value {
        text-align: center;
        letter-spacing: 1.1px;
        text-transform: uppercase;
        font-weight: 600;
        color: ${({ value }) =>
          VISIBILITY_LABEL[value as number].color} !important;
      }
    }
  }
`;
