import styled from "styled-components";
import { AvatarSizes } from "./types";

export const sizes = {
  [AvatarSizes.SMALL]: 20,
  [AvatarSizes.MEDIUM]: 26,
  [AvatarSizes.LARGE]: 36,
  [AvatarSizes.XLARGE]: 55,
  [AvatarSizes.XXLARGE]: 80,
};

export const Layout = styled.div<{ size: number }>`
  overflow: hidden;
  border-radius: 50%;

  ${({ size }) => `
    width: ${size}px;
    min-width: ${size}px;
    height: ${size}px;
  `}
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
`;

export const JazzIcon = styled.div``;
