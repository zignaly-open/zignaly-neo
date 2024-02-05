import React from "react";
import { Box, darken, lighten, useTheme } from "@mui/material";
import { ZScoreRingsProps } from "./types";
import { ZigScoreBalanceIcon, ZigScoreCoinsIcon, ZigScoreWalletIcon } from "icons";
import { AnimatedHandle, AnimatedRingCircle, AnimatedRingSvg } from "./styles";
import chroma from "chroma-js";
import ZigTypography from "../ZigTypography";
import { useRisk } from "../ZigRisk";

const ZScoreRings = (props: ZScoreRingsProps) => {
  const { zScore, profits, risk, service, ...rest } = props;
  const {
    palette: { zscore },
  } = useTheme();

  // const pct = Math.min((value / max) * 100, 100);
  const categories = ["profits", "risk", "service"];
  // const risk = useRisk(value);

  return (
    <Box width={"112px"} height={"112px"} position={"relative"} {...rest}>
      <Box
        position={"absolute"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        height={"100%"}
        width={"100%"}
        top={0}
        left={0}
        right={0}
        bottom={0}
      >
        <Box display={"flex"} flexDirection={"column"}>
          <ZigTypography
            component={"span"}
            fontWeight={600}
            fontSize={19}
            color="neutral000"
            lineHeight={"14px"}
          >
            {Math.round(zScore)}
          </ZigTypography>
          <ZigTypography component={"span"} fontWeight={400} fontSize={9} lineHeight={"12px"}>
            /100
          </ZigTypography>
        </Box>
      </Box>
      <AnimatedRingSvg viewBox="0 0 37 37">
        <defs>
          {categories.map((category) => {
            const colors = zscore.ring[category];
            return (
              <>
                <linearGradient id={`${category}-1`} gradientTransform="rotate(180 0.5 0.5)">
                  <stop offset="0.0" stop-color={colors.gradient[0]} />
                  <stop offset="0.75" stop-color={colors.gradient[1]} />
                </linearGradient>
                <linearGradient id={`${category}-2`} gradientTransform="rotate(-36 0.5 0.5)">
                  <stop offset="0" stop-color={colors.gradient[1]} />
                  <stop offset="0.75" stop-color={colors.gradient[2]} />
                </linearGradient>
              </>
            );
          })}
        </defs>
        {categories.map((category, index) => {
          const pct = Math.min((props[category] / props[`${category}Max`]) * 100, 100);
          console.log(pct, props[category], props[`${category}Max`], category);
          return (
            <g transform={`rotate(90) scale(${1 - index * 0.25})`} key={category}>
              <circle strokeWidth={3 + index} r="15.915" cx="50%" cy="50%" stroke="#242842" />
              {pct > 50 && (
                <>
                  <AnimatedRingCircle
                    strokeWidth={3 + index}
                    r="15.915"
                    cx="50%"
                    cy="50%"
                    stroke={`url('#${category}-2')`}
                    strokeDasharray={`${pct} ${100 - pct}`}
                  />
                  {/* <AnimatedRingCircle
                    strokeWidth={3 + index}
                    r="15.915"
                    cx="50%"
                    cy="50%"
                    stroke={'red'}
                    strokeDasharray={`${pct} ${100 - pct}`}
                  /> */}
                </>
              )}
              <AnimatedRingCircle
                strokeWidth={3 + index}
                r="15.915"
                cx="50%"
                cy="50%"
                stroke={`url('#${category}-1')`}
                strokeDasharray={pct > 50 ? "50 50" : `${pct} ${100 - pct}`}
              />
            </g>
          );
        })}
      </AnimatedRingSvg>
    </Box>
  );
};

export default ZScoreRings;
export * from "./types";
