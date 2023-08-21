import { styled } from "@mui/system";

export const QRCodeContainer = styled("div")<{ width: number; height: number }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  border-radius: 8px;
  background: ${({ theme }) => theme.palette.neutral000};
  /* padding: 6px; */
`;
