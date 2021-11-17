// Dependencies
import styled from 'styled-components';
import { sizeTypesId } from '@types/sizes';

export const sizes = {
  [sizeTypesId.SMALL]: 32,
  [sizeTypesId.MEDIUM]: 42,
  [sizeTypesId.LARGE]: 64
};

export const Layout = styled.div`
  overflow: hidden;
  
  &.${sizeTypesId.SMALL} {
    width: ${sizes[sizeTypesId.SMALL]}px;
    height: ${sizes[sizeTypesId.SMALL]}px;
    border-radius: ${sizes[sizeTypesId.SMALL]}px;
  }

  &.${sizeTypesId.MEDIUM} {
    width: ${sizes[sizeTypesId.MEDIUM]}px;
    height: ${sizes[sizeTypesId.MEDIUM]}px;
    border-radius: ${sizes[sizeTypesId.MEDIUM]}px;
  }

  &.${sizeTypesId.LARGE} {
    width: ${sizes[sizeTypesId.LARGE]}px;
    height: ${sizes[sizeTypesId.LARGE]}px;
    border-radius: ${sizes[sizeTypesId.LARGE]}px;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
`;

export const JazzIcon = styled.div``;
