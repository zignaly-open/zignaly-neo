import { styled } from '@mui/material';

export const IconContainer = styled.div<{ marginRight: number }>`
  margin-right: ${(props) => `${props.marginRight}`}px;
  width: 36px;
  height: 36px;
`;
