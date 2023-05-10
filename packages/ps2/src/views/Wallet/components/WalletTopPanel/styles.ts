import { Box, styled } from '@mui/material';
import { ZigTypography } from '@zignaly-open/ui';
import { withAttrs } from 'util/styles';

export const TopPanel = styled(Box)`
  background: #13122566;
  border-radius: 16px;
  padding: 40px 8% 80px;
`;

export const SubTitle = withAttrs(ZigTypography, {
  variant: 'body1',
  fontWeight: 600,
  fontSize: 12,
  color: 'neutral300',
  mb: '20px',
  ml: '57px',
});

export const Separator = styled('div')`
  width: 1px;
  height: 128px;
  background: #222249;
  align-self: center;
  ${({ theme }) => theme.breakpoints.down('sm')} {
    display: none;
  }
`;
