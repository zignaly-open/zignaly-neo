import React, { useMemo } from "react";
import { Box, Chip } from "@mui/material";
import { ZScoreProps } from "./types";
import {
  ZScoreIcon,
  ZigScoreRingBalance,
  ZigScoreRingProfits,
  ZigScoreRingRisk,
  ZigScoreRingService,
} from "icons";
import { createGlobalStyle } from "styled-components";

const ZScoreBar = ({ value, category, ...rest }: ZScoreProps) => {
  const Styles = createGlobalStyle({});
  const RingSvg = useMemo(() => {
    switch (category) {
      case "profits":
        return ZigScoreRingProfits;
      case "risk":
        return ZigScoreRingRisk;
      case "service":
        return ZigScoreRingService;
      case "balance":
        return ZigScoreRingBalance;
      default:
        return ZigScoreRingBalance;
    }
  }, [category]);

  // return (
  //   <Box width={"112px"} height={"112px"}>
  //     <RingSvg />
  //   </Box>
  // );

  return (
    <svg data="bar" class="bar-svg" width="150" height="6" xmlns="http://www.w3.org/2000/svg">
      <g>
        <line
          x1="2%"
          y1="50%"
          x2="98%"
          y2="50.001%"
          class="stroke-background"
          stroke-width="4"
          stroke-linecap="round"
        ></line>
        <line
          data="bar-line"
          class="stroke-anim"
          stroke-dasharray="0, 150"
          x1="2%"
          y1="50%"
          x2="98%"
          y2="50.001%"
          stroke="url('#linePurple')"
          stroke-width="4"
          stroke-linecap="round"
        ></line>
        <line
          data="bar-dot"
          class="handle-anim"
          stroke-dasharray="0,150"
          stroke-dashoffset="-0"
          x1="2%"
          y1="50%"
          x2="98%"
          y2="50.001%"
          stroke="white"
          stroke-width="6"
          stroke-linecap="round"
        ></line>
      </g>
    </svg>
  );

  return (
    <Box width={"112px"} height={"112px"}>
      <ZigScoreRingProfits />
      <ZigScoreRingRisk />
      <ZigScoreRingService />
      <ZigScoreRingBalance />
    </Box>
  );
};
export default ZScoreBar;
// export { default as ZScoreRingGradients } from "./ZScoreRingGradients";
