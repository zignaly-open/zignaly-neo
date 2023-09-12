import { Box, styled } from '@mui/system';
import { ZigTypography } from '@zignaly-open/ui';

export const InviteBox = styled(Box)`
  z-index: 2;
  margin-right: 8px;
  position: relative;
  width: 265px;
  height: 66px;
  padding: 4px 11px 6px 68px;
  border-radius: 5px;
  border: 1px solid rgba(111, 111, 111, 0.99);
  background: ${({ theme }) => theme.palette.backgrounds.tableHeader};
  display: flex;
  align-items: center;
`;

export const InviteBoxArrow = styled('div')`
  position: absolute;
  top: calc(50% - 12px);
  right: -16px;
  width: 0;
  height: 0;
  border-top: 12px solid transparent;
  border-bottom: 12px solid transparent;
  border-left: 16px solid rgba(111, 111, 111, 0.99);

  &:after {
    content: '';
    width: 0;
    height: 0;
    border-top: 11px solid transparent;
    border-bottom: 11px solid transparent;
    border-left: 15px solid
      ${({ theme }) => theme.palette.backgrounds.tableHeader};
    position: absolute;
    right: 1px;
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

export const ZigTypographyTest = styled(ZigTypography)`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  /* overflow: hidden;
  position: relative;
  line-height: 1.2em;
  max-height: 2.4em;
  text-align: justify;
  margin-right: -1em;
  padding-right: 1em;
  &:before {
    content: '...';
    position: absolute;
    right: 0;
    bottom: 0;
  }
  &:after {
    content: '';
    position: absolute;
    right: 0;
    width: 1em;
    height: 1em;
    margin-top: 0.2em;
    background: red;
  } */
`;
