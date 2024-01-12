import React from "react";
import { Box, darken, lighten, useTheme } from "@mui/material";
import { ZScoreRingProps } from "./types";
import { ZigScoreBalanceIcon, ZigScoreCoinsIcon, ZigScoreWalletIcon } from "icons";
import { AnimatedHandle, AnimatedRingCircle1, AnimatedRingSvg } from "./styles";
import chroma from "chroma-js";
import ZigTypography from "../ZigTypography";

const ZScoreRing = ({ value, max, category, ...rest }: ZScoreRingProps) => {
  const {
    palette: { zscore },
  } = useTheme();

  const pct = Math.min((value / max) * 100, 100);
  const normalizedPct = 0.8 * pct;
  const colors = zscore.ring[category];
  const gradientScale = chroma.scale(colors.gradient);
  const gradientforValue = gradientScale(normalizedPct / 100).hex();

  const categoriesData = {
    profits: { text: "Profits", icon: ZigScoreCoinsIcon },
    risk: { text: "Risk", icon: null },
    service: { text: "Service", icon: ZigScoreWalletIcon },
    balanced: { text: "Balance", icon: ZigScoreBalanceIcon },
  };
  const categoryData = categoriesData[category];

  return (
    <Box width={"112px"} height={"112px"} position={"relative"} {...rest}>
      <Box
        position={"absolute"}
        top="21px"
        textAlign={"center"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        left={0}
        right={0}
        bottom={0}
      >
        {categoryData.icon && (
          <Box display={"flex"} justifyContent={"center"} mb={"7px"}>
            <categoryData.icon color={colors.icon} height={14} />
          </Box>
        )}
        <ZigTypography variant="h4" color={colors.text}>
          {categoryData.text}
        </ZigTypography>
        <Box display={"flex"}>
          <ZigTypography
            component={"span"}
            fontWeight={600}
            fontSize={19}
            color="neutral000"
            lineHeight={"22px"}
          >
            {Math.round(value)}
          </ZigTypography>
          <ZigTypography
            component={"span"}
            fontWeight={500}
            fontSize={17}
            color="#neutral400"
            lineHeight={"22px"}
          >
            /{max}
          </ZigTypography>
        </Box>
        {!categoryData.icon && category === "risk" && (
          <ZigTypography color="#b9b147" variant={"h5"}>
            Average Risk
          </ZigTypography>
        )}
      </Box>
      <AnimatedRingSvg viewBox="0 0 37 37" transform="rotate(36)">
        <defs>
          <linearGradient id={`${category}-1`} gradientTransform="rotate(180 0.5 0.5)">
            <stop offset="0.0" stop-color={colors.gradient[0]} />
            <stop offset="0.75" stop-color={colors.gradient[1]} />
          </linearGradient>
          <linearGradient id={`${category}-2`} gradientTransform="rotate(-36 0.5 0.5)">
            <stop offset="0" stop-color={colors.gradient[1]} />
            <stop offset="0.75" stop-color={colors.gradient[2]} />
          </linearGradient>
        </defs>
        <g transform="rotate(90)">
          <circle
            stroke-width="3.4"
            r="15.915"
            cx="50%"
            cy="50%"
            stroke="#242842"
            stroke-dasharray="80,20"
          />
          {pct > 50 && (
            <AnimatedRingCircle1
              stroke-width="3.4"
              r="15.915"
              cx="50%"
              cy="50%"
              stroke={`url('#${category}-2')`}
              stroke-dasharray={`${normalizedPct} ${100 - normalizedPct}`}
            />
          )}
          <AnimatedRingCircle1
            stroke-width="3.4"
            r="15.915"
            cx="50%"
            cy="50%"
            stroke={`url('#${category}-1')`}
            stroke-dasharray={pct > 50 ? "40 60" : `${normalizedPct} ${100 - normalizedPct}`}
          />
          <AnimatedHandle
            stroke-width="5"
            r="15.915"
            cx="50%"
            cy="50%"
            stroke={lighten(gradientforValue, 0.55)}
            stroke-dasharray="0 100"
            stroke-dashoffset={-normalizedPct}
          />
          <AnimatedHandle
            stroke-width="3.2"
            r="15.915"
            cx="50%"
            cy="50%"
            stroke={darken(gradientforValue, 0.1)}
            stroke-dasharray="0 100"
            stroke-dashoffset={-normalizedPct}
          />
        </g>
      </AnimatedRingSvg>
    </Box>
  );
};

export default ZScoreRing;
