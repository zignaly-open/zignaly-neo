import styled from "styled-components";

export const Icon = styled.img<{ size: number }>`
  ${({ size }) => `
    width: ${size}px;
    height: ${size}px;
  `}
  border-radius: 50%;
`;
