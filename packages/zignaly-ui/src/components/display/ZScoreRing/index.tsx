import React from "react";
import { Box, darken, lighten, useTheme } from "@mui/material";
import { ZScoreRingProps } from "./types";
import { ZigScoreBalanceIcon, ZigScoreCoinsIcon, ZigScoreWalletIcon } from "icons";
import { AnimatedHandle, AnimatedRingCircle, AnimatedRingSvg } from "./styles";
import chroma from "chroma-js";
import ZigTypography from "../ZigTypography";
import { useRisk } from "../ZigRisk";
import { GradientDefs } from "./atoms";

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
  const risk = useRisk(value);
  const prefixId = "zscore-ring";

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
            <categoryData.icon color={colors.icon} height={16} width={"100%"} />
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
            {
              // eslint-disable-next-line i18next/no-literal-string
              `/${max}`
            }
          </ZigTypography>
        </Box>
        {!categoryData.icon && category === "risk" && (
          <ZigTypography color={risk?.color} variant={"h5"}>
            {risk?.label}
          </ZigTypography>
        )}
      </Box>
      <AnimatedRingSvg viewBox="0 0 37 37" transform="rotate(36)">
        <GradientDefs prefixId={prefixId} category={category} />
        <g transform="rotate(90)">
          <circle
            strokeWidth="3.4"
            r="15.915"
            cx="50%"
            cy="50%"
            stroke="#242842"
            strokeDasharray="80,20"
          />
          {pct > 50 && (
            <AnimatedRingCircle
              strokeWidth="3.4"
              r="15.915"
              cx="50%"
              cy="50%"
              stroke={`url('#${prefixId}-${category}-2')`}
              strokeDasharray={`${normalizedPct} ${100 - normalizedPct}`}
            />
          )}
          <AnimatedRingCircle
            strokeWidth="3.4"
            r="15.915"
            cx="50%"
            cy="50%"
            stroke={`url('#${prefixId}-${category}-1')`}
            strokeDasharray={pct > 50 ? "40 60" : `${normalizedPct} ${100 - normalizedPct}`}
          />
          <AnimatedHandle
            strokeWidth="5"
            r="15.915"
            cx="50%"
            cy="50%"
            stroke={lighten(gradientforValue, 0.55)}
            strokeDasharray="0 100"
            strokeDashoffset={-normalizedPct}
          />
          <AnimatedHandle
            strokeWidth="3.2"
            r="15.915"
            cx="50%"
            cy="50%"
            stroke={darken(gradientforValue, 0.1)}
            strokeDasharray="0 100"
            strokeDashoffset={-normalizedPct}
          />
        </g>
      </AnimatedRingSvg>
    </Box>
  );
};

export default ZScoreRing;
export * from "./types";
