import { styled, css } from '@mui/material';
import { styledIf, Typography } from '@zignaly-open/ui';

export const Layout = styled('div')<{ width: number }>`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background: #101225;
  border: 1px solid #35334a;
  border-radius: 16px;
  padding: 40px 56px;
  ${({ width }) =>
    width &&
    css`
      width: ${width}px; // TODO: responsiveness
    `};
  user-select: none;
`;

export const Title = styled(Typography)`
  display: flex;
  justify-content: space-between;
`;

export const Body = styled('div')`
  font-size: 14px;
  text-align: left;
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.palette.neutral200};
  max-height: calc(100vh - 150px);
  overflow-y: auto;
  overflow-x: visible;
  margin-left: -40px;
  margin-right: -40px;
  width: calc(100% + 80px);
  padding-left: 40px;
  padding-right: 40px;
`;

export const Header = styled('div')<{ compact: boolean }>`
  display: flex;
  z-index: 999;
  position: relative;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  margin-bottom: 14px;
  ${({ compact }) =>
    compact &&
    `
    width: 32px;
    position: absolute;
    right: 56px;
    top: 40px;
  `}
`;

export const HeaderButton = styled('button')`
  border: 0;
  padding: 0;
  margin: 0;
  height: 32px;
  width: 32px;
  background: transparent;
  border: none;
  cursor: pointer;
  ${({ theme }) => `
    svg { 
      fill: ${theme.palette.neutral300};
    }
  `}
`;

export const Inline = styled('div')<{ align?: string }>`
  ${({ align }) => `
    ${styledIf(
      align === 'center',
      `
       flex: 1;
       `,
    )}
  `}
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;

export const ModalActions = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 56px;
  gap: 32px;

  ${({ theme }) => `
    svg {
      fill: ${theme.palette.links};
    }
  `}
`;

// todo: check if it can replace ModalActions
export const ModalActionsNew = styled('div')<{
  align?: 'left' | 'center' | 'right';
}>`
  display: flex;
  align-items: center;
  margin-top: 56px;
  gap: 14px;
  flex-direction: row;
  width: 100%;
  justify-content: ${({ align }) =>
    align === 'left'
      ? 'flex-start'
      : align === 'right'
      ? 'flex-end'
      : 'center'};
`;
