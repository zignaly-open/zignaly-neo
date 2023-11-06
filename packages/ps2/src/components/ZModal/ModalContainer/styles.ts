import styled from '@emotion/styled';
import { css, Box, IconButton } from '@mui/material';
import { styledIf, ZigTypography } from '@zignaly-open/ui';
import { withAttrs } from 'util/styles';

export const Layout = styled(Box)<{
  width: number;
  mobileFullScreen?: boolean;
}>`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background: ${({ theme }) =>
    theme.palette.backgrounds.modal || theme.palette.neutral800};
  border: 1px solid ${(props) => props.theme.palette.neutral600};
  border-radius: 16px;
  padding: 40px 56px;

  &:focus-visible {
    outline: none;
  }

  ${({ width }) =>
    width &&
    css`
      width: ${width}px; // TODO: responsiveness
      @media (max-width: ${width}px) {
        width: 100%;
        border-radius: 0;
        border-left-width: 0;
        border-right-width: 0;
      }
    `};
  max-width: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
    padding: 23px 23px 30px;
    ${({ mobileFullScreen }) =>
      mobileFullScreen &&
      css`
        padding-bottom: 0;
        justify-content: flex-start;
        height: 100%;
        border-radius: 0;
        border-top-width: 0;
        border-bottom-width: 0;
      `}
  }
`;

export const Title = styled(ZigTypography)`
  display: flex;
  justify-content: space-between;
  text-transform: capitalize;
  @media (max-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
    padding-left: 30px;
    padding-right: 30px;
    text-align: center;
  }
`;

export const Body = styled('div', {
  shouldForwardProp: (prop) => prop !== 'mobileFullScreen',
})<{ mobileFullScreen?: boolean }>`
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

  @media (max-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
    margin-left: -20px;
    margin-right: -20px;
    width: calc(100% + 40px);
    padding-left: 20px;
    padding-right: 20px;
  }

  /* Style Description  */
  > .MuiTypography-root:first-child {
    margin-bottom: 24px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
    ${({ mobileFullScreen }) =>
      mobileFullScreen &&
      css`
        max-height: 100%;
        padding-bottom: 30px;
      `}
  }
`;

export const Header = styled(Box)<{ compact: boolean }>`
  display: flex;
  z-index: 996;
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

export const ModalActions = styled(
  withAttrs(Box, {
    /* Will be overwritten to a smaller margin when inside Form */
    mt: '35px',
  }),
)<{
  align?: 'left' | 'center' | 'right';
  direction?: 'row' | 'column';
}>`
  display: flex;
  align-items: center;
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

export const Form = styled(
  withAttrs(Box, {
    component: 'form',
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
  }),
)`
  > ${ModalActions} {
    margin-top: 11px;
  }
`;

export const BackIconButton = styled(IconButton)`
  position: absolute;
  left: 22px;
  z-index: 999;
  top: 16px;
`;

export const CloseIconButton = styled(IconButton)`
  position: absolute;
  right: 22px;
  z-index: 999;
  top: 16px;
`;
