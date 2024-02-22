import { styled } from "@mui/system";

export const HeaderLinksContainer = styled("nav")`
  display: flex;
  flex-direction: row;
  gap: 28px;
  user-select: none;

  a {
    color: ${({ theme }) => theme.palette.neutral200};
    font-weight: 400;
    font-size: 14px;
    line-height: 28px;
    letter-spacing: 0.55px;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: ${({ theme }) => theme.palette.neutral100};
    }

    &.active {
      &,
      &:hover {
        color: ${({ theme }) => theme.palette.highlighted};
      }
    }
  }
`;
