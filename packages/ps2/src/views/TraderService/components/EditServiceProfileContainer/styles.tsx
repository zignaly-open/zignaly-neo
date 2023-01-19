import { styled } from '@mui/system';
import { ZigSelect } from '@zignaly-open/ui';
import { VISIBILITY_LABEL } from './types';

export const LogoContainer = styled('div')`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  .MuiCircularProgress-root {
    position: absolute;
  }

  button {
    display: none;
    position: absolute;
    top: -6px;
    right: -12px;
    padding: 0;
  }

  &:hover {
    button {
      display: block;
    }
  }
`;
export const StyledZigSelect = styled(ZigSelect)`
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
`;
