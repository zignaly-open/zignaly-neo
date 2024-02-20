import { styled } from "@mui/system";

export const RingsConnectorLine = styled("div")`
  width: 1.5px;
  height: 11px;
  background: #2d3d7a;
`;

export const RingsConnectorCircle = styled("div")`
  width: 7px;
  height: 7px;
  position: relative;
  border-radius: 50%;
  background: #0b0e25;
  margin-top: 2px;

  &::before {
    background-image: linear-gradient(to right, #3b3280 0%, #286281 100%);
    content: "";
    position: absolute;
    top: -2px;
    bottom: -2px;
    right: -2px;
    left: -2px;
    z-index: -1;
    border-radius: inherit;
  }
`;
