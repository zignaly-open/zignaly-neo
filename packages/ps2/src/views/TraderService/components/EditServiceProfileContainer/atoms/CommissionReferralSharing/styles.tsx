import { Box } from '@mui/material';
import styled from '@emotion/styled';
import { ZigSlider, ZigTypography } from '@zignaly-open/ui';

export const SliderBox = styled(Box)`
  width: 400px;
  border: 1px dotted ${({ theme }) => theme.palette.neutral600};
  padding: 20px 22px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  justify-content: center;
`;

export const StyledZigSlider = styled(ZigSlider)`
  padding: 0 20px;

  > div > div > div {
    min-width: 33px;
  }

  .MuiSlider-thumb {
    width: 21px;
    height: 21px;
  }

  .MuiTypography-root {
    &:nth-of-type(2) {
      font-size: 21px;
      color: ${({ theme }) => theme.palette.neutral100};

      &::after {
        content: '%';
        font-size: 12px;
        position: relative;
        top: -7px;
      }
    }
  }

  .MuiSlider-valueLabel {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 13.5px;
    background-color: ${({ theme }) => theme.palette.greenGraph}1E;
    height: 27px;
    gap: 4px;
    padding: 3px 8px;
    height: 32px;
    margin-top: 10px;

    .MuiTypography-root {
      color: rgba(38, 196, 150, 0.9);
      font-weight: 600;
    }

    svg {
      height: 15px;
      width: auto;
    }
  }
`;

export const ZigTypographyValue = styled(ZigTypography)`
  font-size: 19px;

  &::after {
    content: '%';
    font-size: 11px;
    position: relative;
    top: -5px;
  }
`;
export const ValueBox = styled(Box)``;
