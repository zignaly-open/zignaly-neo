import { Box, styled } from '@mui/material';

export const TierBarContainer = styled(Box)<{ opacity: number }>`
  align-items: center;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  background-image: linear-gradient(
    to top,
    rgba(18, 33, 59, ${({ opacity }) => opacity}),
    rgba(33, 81, 78, ${({ opacity }) => 0.48 * opacity})
  );
  margin: 0 10px;
  position: relative;
  padding-top: 4px;
  overflow: hidden;

  svg {
    height: 12px;
    min-height: 12px;
    width: 7.5px;
    min-width: 7.5px;
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 4px;
    padding: 2px;
    background: none;
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask: linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
    background: linear-gradient(to top, #15192f, #009179);
    background-image: linear-gradient(
      to top,
      rgba(21, 25, 47, ${({ opacity }) => opacity}),
      rgba(0, 145, 121, ${({ opacity }) => opacity})
    );
  }
`;

export const TierArrow = styled('div')<{ opacity: number }>`
  position: relative;
  width: 30px;
  height: 100%;
  margin-top: 6px;
  opacity: ${({ opacity }) => opacity};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-bottom: 15px solid rgba(33, 81, 78, 0.69);
  }

  &::after {
    content: '';
    position: absolute;
    top: 15px;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    width: 14px;
    background-image: linear-gradient(to top, #111a30, rgba(33, 81, 78, 0.69));
  }
`;
