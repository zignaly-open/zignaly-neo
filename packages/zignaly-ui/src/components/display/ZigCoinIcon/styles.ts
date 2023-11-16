import { styled } from "@mui/system";

export const Icon = styled("img")<{ size: number }>`
  ${({ size }) => `
    width: ${size}px;
    height: ${size}px;
  `}
  border-radius: 50%;
`;

export const Placeholder = styled(Icon)<{ size: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.palette.backgrounds.coinIconPlaceholder};
  font-size: 16px;
`;
