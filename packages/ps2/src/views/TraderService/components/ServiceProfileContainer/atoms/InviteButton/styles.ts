import { Box, styled } from '@mui/system';
import { ZigTypography } from '@zignaly-open/ui';

export const InviteBox = styled(Box)`
  z-index: 2;
  margin-left: 8px;
  position: relative;
  width: 229px;
  height: 66px;
  padding: 4px 11px 4px 68px;
  border-radius: 5px;
  border: 1px solid rgba(111, 111, 111, 0.99);
  background: ${({ theme }) => theme.palette.backgrounds.tableHeader};
  display: flex;
  align-items: center;
`;

export const InviteBoxArrow = styled('div')`
  position: absolute;
  top: calc(50% - 12px);
  left: -16px;
  width: 0;
  height: 0;
  border-top: 12px solid transparent;
  border-bottom: 12px solid transparent;
  border-right: 16px solid rgba(111, 111, 111, 0.99);

  &:after {
    content: '';
    width: 0;
    height: 0;
    border-top: 11px solid transparent;
    border-bottom: 11px solid transparent;
    border-right: 15px solid
      ${({ theme }) => theme.palette.backgrounds.tableHeader};
    position: absolute;
    left: 1px;
    top: calc(50% - 11px);
  }
`;

export const ComissionTypography = styled(ZigTypography)`
  background-image: linear-gradient(to top, #fe8401, #fec902),
    linear-gradient(to bottom, #eede75, #eede75);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: flex;
  align-items: center;
  line-height: 1.66;
  font-size: 14.5px;
  font-weight: 600;
`;
