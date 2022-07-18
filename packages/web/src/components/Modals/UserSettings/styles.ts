import styled from '@emotion/styled';
import { Typography } from 'zignaly-ui';

export const InputContainer = styled.div<{ width: number }>`
  width: ${(props) => props.width}px;
`;

export const Link = styled(Typography)`
  cursor: pointer;
`;
