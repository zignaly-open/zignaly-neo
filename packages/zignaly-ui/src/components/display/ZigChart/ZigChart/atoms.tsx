import React from "react";
import { useTheme } from "@mui/material";
import { VictoryTooltip, VictoryLabel, LineSegment, Point, VictoryTooltipProps } from "victory";

export const ChartTooltip = (props: VictoryTooltipProps) => {
  const theme = useTheme();

  return (
    <g>
      <VictoryTooltip
        {...props}
        orientation="top"
        cornerRadius={8}
        flyoutStyle={{ fill: "#151515", stroke: "#313131" }}
        pointerOrientation="bottom"
        flyoutPadding={8}
        // text={(data) => `${data.datum.x} \n ${data.datum.y}`}
        labelComponent={<VictoryLabel lineHeight={1.5} />}
        // text={`${props.text[0]} \n ${props.text[1]}`}
        style={[
          { fill: theme.palette.neutral300, fontSize: "14px" },
          { fill: theme.palette.neutral200, fontSize: "16px" },
        ]}
      />
      <LineSegment
        x1={props.x}
        y1={props.y}
        x2={props.x}
        y2={props.height - 20}
        style={{
          stroke: "#3e495b",
        }}
      />
      <Point
        x={props.x}
        y={props.y}
        size={5}
        style={{
          stroke: props.color,
          fill: "#353234",
        }}
      />
    </g>
  );
};
