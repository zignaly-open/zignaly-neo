import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { ZigSlider } from '@zignaly-open/ui';

export const SliderContainer = styled(Box)`
  position: relative;
  width: 100%;
  min-height: 111px;
  border: 1.6px solid #202735;
  border-radius: 15px;
  padding: 11px 16px 3px 16px;
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
  border-bottom: 20px solid #202735;

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
  width: 370px;

  div:has(> .MuiTypography-root) {
    min-width: 64px;
  }

  .MuiSlider-root {
    height: 5px;
  }

  .MuiSlider-thumb {
    width: 21px;
    height: 21px;
  }

  .MuiTypography-root {
    &:nth-of-type(2) {
      font-size: 24px;
      font-weight: 600;
      color: ${({ theme }) => theme.palette.paleBlue};
      position: relative;
      width: 100%;
      text-align: center;
      min-width: 53px;
      padding-bottom: 2px;

      &::after {
        content: '%';
        font-size: 13px;
        position: relative;
        top: -7px;
      }
    }
    &:nth-of-type(1) {
      color: ${({ theme }) => theme.palette.neutral100};
      font-size: 13px;
      font-weight: 400;
      margin-right: -3px;
      margin-bottom: 10px;
      margin-left: 7px;
    }
  }
`;
