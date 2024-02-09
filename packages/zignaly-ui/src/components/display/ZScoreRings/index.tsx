import React from "react";
import { Box } from "@mui/material";
import { ZScoreRingsProps } from "./types";
import ZigTypography from "../ZigTypography";
import RingsConnector from "./atoms/RingsConnector";
import { AnimatedRingCircle, AnimatedRingSvg } from "../ZScoreRing/styles";
import { GradientDefs } from "../ZScoreRing/atoms";
import { ZScoreRiskCategory } from "../ZScoreRing/types";

const ZScoreRings = (props: ZScoreRingsProps) => {
  const { zScore, profits, risk, service, ...rest } = props;
  const categories = ["profits", "risk", "service"] as ZScoreRiskCategory[];
  const prefixId = "zscore-rings";

  return (
    <div>
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
              id={`${prefixId}__zscore`}
            >
              {Math.round(zScore)}
            </ZigTypography>
            <ZigTypography component={"span"} fontWeight={400} fontSize={9} lineHeight={"12px"}>
              {"/100"}
            </ZigTypography>
          </Box>
        </Box>
        <AnimatedRingSvg viewBox="0 0 37 37">
          {categories.map((category, index) => {
            const pct = Math.min((props[category] / props[`${category}Max`]) * 100, 100);

            return (
              <>
                <GradientDefs prefixId={"zscore-rings"} key={category} category={category} />
                <g transform={`rotate(90) scale(${1 - index * 0.25})`} key={category}>
                  <circle strokeWidth={3 + index} r="15.915" cx="50%" cy="50%" stroke="#242842" />
                  {pct > 50 && (
                    <AnimatedRingCircle
                      strokeWidth={3 + index}
                      r="15.915"
                      cx="50%"
                      cy="50%"
                      stroke={`url('#${prefixId}-${category}-2')`}
                      strokeDasharray={`${pct} ${100 - pct}`}
                    />
                  )}
                  <AnimatedRingCircle
                    strokeWidth={3 + index}
                    r="15.915"
                    cx="50%"
                    cy="50%"
                    stroke={`url('#${prefixId}-${category}-1')`}
                    strokeDasharray={pct > 50 ? "50 50" : `${pct} ${100 - pct}`}
                  />
                </g>
              </>
            );
          })}
        </AnimatedRingSvg>
      </Box>
      <RingsConnector />
    </div>
  );
};

export default ZScoreRings;
