import { styled } from '@mui/material';
import { ZigSelect } from '@zignaly-open/ui';

export const Header = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 88px;
  margin-top: 46px;
`;

export const StyledZigSelect = styled(ZigSelect)`
  min-width: 210px;

  .zig-react-select {
    &__control {
      padding: 0;
      padding-right: 4px;
    }

    &__single-value {
      font-weight: 600;
      font-size: 11px;
      color: ${({ theme }) => theme.palette.neutral300} !important;
      letter-spacing: 1.1px;
    }
  }
`;
