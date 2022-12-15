import styled from "styled-components";
import { CoinSizes } from "./types";

export const sizes = {
  [CoinSizes.SMALL]: 32,
  [CoinSizes.MEDIUM]: 36,
  [CoinSizes.LARGE]: 40,
};

export const Layout = styled.div<{ size: CoinSizes }>`
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
