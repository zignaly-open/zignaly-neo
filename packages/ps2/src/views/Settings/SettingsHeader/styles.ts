import { styled } from '@mui/material';
import { Theme } from '@mui/system';

const secondaryBackground = ({ theme }: { theme: Theme }) => `
  background: ${theme.palette.backgrounds.secondaryBackground};
`;

export const Layout = styled('div')`
  flex-direction: row;
  position: fixed;
  top: 52px;
  width: 100%;
  right: 0;
  left: 0;
  ${secondaryBackground};
  z-index: 50;
`;

export const Container = styled('div')`
  display: flex;
  flex-direction: row;
  & > * {
    flex: 1;
    border-right: 1px dotted ${({ theme }) => theme.palette.neutral600};
  }
  &:first-child {
    border-left: 1px dotted ${({ theme }) => theme.palette.neutral600};
  }
`;
