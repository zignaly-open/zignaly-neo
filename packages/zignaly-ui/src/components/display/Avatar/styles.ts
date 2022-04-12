// Dependencies
import styled from "styled-components";
import { AvatarSizes } from "./types";

export const sizes = {
  [AvatarSizes.SMALL]: 32,
  [AvatarSizes.MEDIUM]: 42,
  [AvatarSizes.LARGE]: 64,
};

export const Layout = styled.div`
  overflow: hidden;

  &.${AvatarSizes.SMALL} {
    width: ${sizes[AvatarSizes.SMALL]}px;
    height: ${sizes[AvatarSizes.SMALL]}px;
    border-radius: ${sizes[AvatarSizes.SMALL]}px;
  }

  &.${AvatarSizes.MEDIUM} {
    width: ${sizes[AvatarSizes.MEDIUM]}px;
    height: ${sizes[AvatarSizes.MEDIUM]}px;
    border-radius: ${sizes[AvatarSizes.MEDIUM]}px;
  }

  &.${AvatarSizes.LARGE} {
    width: ${sizes[AvatarSizes.LARGE]}px;
    height: ${sizes[AvatarSizes.LARGE]}px;
    border-radius: ${sizes[AvatarSizes.LARGE]}px;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
`;

export const JazzIcon = styled.div``;
