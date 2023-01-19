import { styled } from '@mui/system';

export const LogoContainer = styled('div')`
  position: relative;

  button {
    display: none;
    position: absolute;
    top: -6px;
    right: -12px;
    padding: 0;
  }

  &:hover {
    button {
      display: block;
    }
  }
`;
