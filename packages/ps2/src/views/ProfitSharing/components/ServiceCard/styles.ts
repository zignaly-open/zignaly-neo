import { Box } from '@mui/material';
import { styled } from '@mui/system';
import { ServiceName } from 'views/Dashboard/components/ServiceName';

export const StyledServiceName = styled(ServiceName)`
  &:nth-child(1) {
    position: relative;
    margin-right: 0;
  }
  div:has(> img) {
    width: 75px;
    height: 75px;
  }
  .MuiTypography-body1 {
    font-size: 18px;
  }
  .MuiTypography-body2 {
    font-size: 12px;
  }
`;

export const Card = styled(Box)`
  width: 340px;
  height: 280px;
  padding: 21px 22px;
  border-radius: 7.5px;
  border: solid 1px ${({ theme }) => theme.palette.neutral700};
  background: radial-gradient(
    circle at center,
    #2c418563 0%,
    #15193663 55%,
    #20202563 100%
  );
  background-color: #0b0b23;
  align-items: center;
  display: flex;
  flex-direction: column;
  text-align: center;
`;

export const ButtonContainer = styled(Box)`
  > div > div > div > div {
    max-height: 66px;
  }
`;

export const ChangeIndicatorContainer = styled(Box)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  .MuiTypography-root {
    backdrop-filter: blur(1px);
  }
`;
