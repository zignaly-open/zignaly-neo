import { styled, css, Box, IconButton } from '@mui/material';
import { styledIf, ZigTypography } from '@zignaly-open/ui';
import { withAttrs } from 'util/styles';

export const Layout = styled(Box)<{ width: number }>`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background: #101225;
  border: 1px solid #35334a;
  border-radius: 16px;
  padding: 40px 56px;

  &:focus-visible {
    outline: none;
  }

  ${({ width }) =>
    width &&
    css`
      width: ${width}px; // TODO: responsiveness
    `};
`;

export const Title = styled(ZigTypography)`
  display: flex;
  justify-content: space-between;
  text-transform: capitalize;
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

  /* Style Description  */
  > .MuiTypography-root:first-child {
    margin-bottom: 24px;
  }
`;

export const Header = styled(Box)<{ compact: boolean }>`
  display: flex;
  z-index: 999;
  position: relative;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  margin-bottom: 18px;
  ${({ compact }) =>
    compact &&
    `
    width: 32px;
    position: absolute;
    right: 56px;
    top: 40px;
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

export const Form = styled(
  withAttrs(Box, {
    component: 'form',
    display: 'flex',
    flexDirection: 'column',
    gap: '42px',
  }),
)`
  > div:last-child {
    margin-top: 0;
  }
`;

export const ModalActions = styled('div')<{
  align?: 'left' | 'center' | 'right';
  direction?: 'row' | 'column';
}>`
  display: flex;
  align-items: center;
  margin-top: 20px;
  gap: 32px;
  flex-direction: ${({ direction }) => direction};
  width: 100%;
  justify-content: ${({ align }) =>
    align === 'left'
      ? 'flex-start'
      : align === 'right'
      ? 'flex-end'
      : 'center'};
`;

export const CloseIconButton = styled(IconButton)`
  position: absolute;
  right: 22px;
  top: 16px;
`;
