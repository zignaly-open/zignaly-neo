import styled from '@emotion/styled';
import { Typography } from 'zignaly-ui';

export const Gap = styled.div<{ gap: number }>`
  ${(props) => `
  padding: ${props.gap}px;`}
`;

export const Subtitle = styled(Typography)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;
