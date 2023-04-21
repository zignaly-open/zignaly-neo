import { styled } from '@mui/system';

export const LogoContainer = styled('div')`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  .MuiCircularProgress-root {
    position: absolute;
  }

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
