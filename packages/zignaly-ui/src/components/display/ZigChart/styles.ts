import { styled } from "@mui/system";

export const ChartLayoutLarge = styled("div")`
  width: 100%;
`;

export const ChartLayoutMini = styled("div")<{ height?: number }>`
  height: ${(props) => props.height || 100}px;
  width: auto;
  display: inline-block;
`;
