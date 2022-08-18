import styled from 'styled-components';
import {
  styledIf,
  Typography,
  ArrowBottomIcon,
  GlobeLanguages,
} from '@zignaly-open/ui';

export const LabelButton = styled(Typography)`
  transition: 0.15s linear;
`;

export const ArrowBottomIconStyled = styled(ArrowBottomIcon)`
  transition: 0.15s linear;
`;

export const GlobeLanguagesStyled = styled(GlobeLanguages)`
  transition: 0.15s linear;
`;

export const Button = styled.button<{ isMenu: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: transparent;
  width: 100%;
  border: none;
  padding: 18px;
  user-select: none;
  border-radius: 8px 0 0 0;

  ${({ isMenu }) => `
    ${styledIf(
      isMenu,
      `
      cursor: pointer;
       svg {
          transition: 0.15s linear;
       }
      &:hover {
        ${LabelButton} {
          color: #fff;
        }
        ${ArrowBottomIconStyled} {
          path {
            fill: #fff;
          }
        }
        ${GlobeLanguagesStyled} {
          stroke: #fff;
        }
      }  
    `,
    )}
  `}
`;

export const Container = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 100%;
  z-index: 10;
  background: #191a30;
  max-height: 300px;
  overflow: auto;
  border-radius: 0 0 6px 6px;

  /* width */

  &::-webkit-scrollbar {
    width: 6px;
  }

  /* Track */

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
  }

  /* Handle */

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 12px;
  }

  /* Handle on hover */

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.15);
  }
`;

export const Item = styled.div`
  background: transparent;
  padding: 12px 18px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  user-select: none;

  &:hover {
    background: #1c1d35;
  }

  span {
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const Field = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  overflow: hidden;

  span {
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const Layout = styled.div<{ isActive: boolean }>`
  position: relative;

  ${({ isActive }) => `
    ${styledIf(
      isActive,
      `
      ${Button} {
        background: #191A30;
      }
    `,
    )}
  `}
`;
