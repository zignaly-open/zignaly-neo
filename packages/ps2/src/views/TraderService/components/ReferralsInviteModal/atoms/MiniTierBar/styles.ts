import { styled } from '@mui/material';
import { TierBarContainer as TierBarContainerBase } from '../TierBar/styles';

export const TierBarContainer = styled(TierBarContainerBase)<{
  opacity: number;
  emphasis: boolean;
  subLayer?: boolean;
  hide?: boolean;
}>`
  margin: 0 4px;
  padding-top: 0;

  &::before {
    ${({ hide }) => !hide && `content: '';`}
  }
`;

export const TierArrow = styled('div')<{ subLayer?: boolean }>`
  position: absolute;
  height: 100%;
  width: 100%;
  margin-top: ${({ subLayer }) => (subLayer ? -3 : 6)}px;
  opacity: 0.15;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #28ba62;
  }

  &::after {
    content: '';
    position: absolute;
    top: 10px;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    width: 10px;
    background: linear-gradient(#28ba62 18%, #0c2438),
      linear-gradient(#103e50, #0c2438 100%);
  }
`;
