import styled from 'styled-components';
import { styledIf } from '@zignaly-open/ui';
import { NiceScrollbar } from '@zignaly-open/ui/src/utils/css';

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
      &:hover {
        background: #191A30;
      }  
    `,
    )}
  `}
`;

export const Container = styled.div`
  top: 100%;
  z-index: 10;
  background: #191a30;
  width: 220px;
  max-height: 300px;
  overflow: auto;
  border-radius: 0 0 6px 6px;

  ${NiceScrollbar};
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
