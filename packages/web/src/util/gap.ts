import styled from '@emotion/styled';

export const Gap = styled.div<{ gap: number }>`
  ${(props) => `
  padding: ${props.gap}px;
  `}
`;
