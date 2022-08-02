import styled from "styled-components";

export const Gap = styled.div<{ gap: number }>`
  ${(props) => `
  padding: ${props.gap}px;
  `}
`;
