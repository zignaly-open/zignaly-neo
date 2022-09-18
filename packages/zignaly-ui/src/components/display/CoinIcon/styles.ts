import styled from "styled-components";
import { CoinSizes } from "./types";

export const sizes = {
  [CoinSizes.SMALL]: 32,
  [CoinSizes.MEDIUM]: 36,
  [CoinSizes.LARGE]: 40,
};

export const Layout = styled.div`
  overflow: hidden;
  border-radius: 50%;

  &.${CoinSizes.SMALL} {
    width: ${sizes[CoinSizes.SMALL]}px;
    height: ${sizes[CoinSizes.SMALL]}px;
  }

  &.${CoinSizes.MEDIUM} {
    width: ${sizes[CoinSizes.MEDIUM]}px;
    height: ${sizes[CoinSizes.MEDIUM]}px;
  }

  &.${CoinSizes.LARGE} {
    width: ${sizes[CoinSizes.LARGE]}px;
    height: ${sizes[CoinSizes.LARGE]}px;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
`;
