import styled from "styled-components";
import { CoinSize, CoinSizes } from "./types";

export const sizes = {
  [CoinSizes.Small]: 32,
  [CoinSizes.Medium]: 36,
  [CoinSizes.Large]: 40,
};

export const Layout = styled.div<{ size: CoinSize }>`
  overflow: hidden;
  border-radius: 50%;

  ${({ size }) => `
    width: ${sizes[size]}px;
    height: ${sizes[size]}px;
  `}
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
`;
