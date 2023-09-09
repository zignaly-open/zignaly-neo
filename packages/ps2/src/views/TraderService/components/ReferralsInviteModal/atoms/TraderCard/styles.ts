import { styled, Box } from '@mui/material';

export const CardBox = styled(Box)`
  border-radius: 7.5px;
  border: solid 1px #25233c;
  background: radial-gradient(
    circle at center,
    #131e53 0%,
    #090824 57%,
    transparent 100%
  );
  box-shadow: 0 0 60px -2px rgba(90, 81, 245, 0.17);
`;

export const CommissionBoostChip = styled(Box)`
  position: absolute;
  top: 0;
  transform: translateY(-50%);
`;

export const AvatarBox = styled(Box)``;
