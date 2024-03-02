import { styled } from "@mui/system";

export const LogoContainer = styled("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  .MuiCircularProgress-root {
    position: absolute;
  }

  img {
    object-fit: contain;
  }

  button {
    opacity: 0;
    position: absolute;
    top: -6px;
    right: -12px;
    padding: 4px;
    transition: opacity 0.25s;
  }

  &:hover {
    button {
      opacity: 1;
    }
  }
`;
