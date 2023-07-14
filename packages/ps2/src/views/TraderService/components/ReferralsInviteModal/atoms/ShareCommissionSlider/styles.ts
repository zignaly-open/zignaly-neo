import { Box, styled } from '@mui/material';
import { ZigSlider } from '@zignaly-open/ui';

export const SliderContainer = styled(Box)`
  position: relative;
  width: 100%;
  height: 114px;
  border: 1px solid #9496b41a;
  border-radius: 15px;
  padding: 16px;
  width: 428px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 28px;
`;

export const ContainerArrow = styled('div')`
  position: absolute;
  top: -20px;
  left: calc(50% - 22px);
  width: 0;
  height: 0;
  border-left: 22px solid transparent;
  border-right: 22px solid transparent;
  border-bottom: 20px solid #9496b41a;

  &:after {
    content: '';
    width: 0;
    height: 0;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-bottom: 18px solid rgb(16, 18, 37);
    position: absolute;
    right: -20px;
    top: 2px;
  }
`;

export const StyledZigSlider = styled(ZigSlider)`
  margin-top: 13px;
  padding: 0 24px;
  width: 350px;

  div:has(> .MuiTypography-root) {
    min-width: 64px;
  }

  .MuiTypography-root {
    &:nth-of-type(2) {
      font-size: 24px;
      font-weight: 600;
      color: #999fe1;
      position: relative;

      &::after {
        content: '%';
        font-size: 13px;
        position: relative;
        top: -7px;
      }
    }
    &:nth-of-type(1) {
      color: #c6c6d1;
      font-size: 13px;
      font-weight: 500;
    }
  }
`;
