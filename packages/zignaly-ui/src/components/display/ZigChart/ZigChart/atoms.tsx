import React from "react";
import { useTheme } from "@mui/material";
import { VictoryTooltip, VictoryLabel, LineSegment, Point, VictoryTooltipProps } from "victory";

export const ChartTooltip = React.memo(
  ({ color, ...props }: VictoryTooltipProps & { color?: string }) => {
    const theme = useTheme();

    if (!props.text) return null;

    return (
      <g>
        <VictoryTooltip
          {...props}
          orientation="top"
          cornerRadius={8}
          flyoutStyle={{ fill: "#151515", stroke: "#313131" }}
          pointerOrientation="bottom"
          flyoutPadding={8}
          labelComponent={<VictoryLabel lineHeight={1.5} />}
          style={[
            {
              fill: theme.palette.neutral300,
              fontSize: "14px",
              fontFamily: "Avenir Next",
            },
            {
              fill: theme.palette.neutral200,
              fontSize: "16px",
              fontFamily: "Avenir Next",
            },
          ]}
        />
        <LineSegment
          x1={props.x}
          y1={props.y}
          x2={props.x}
          y2={props.height ? props.height - 20 : 0}
          style={{
            stroke: "#3e495b",
          }}
        />
        <Point
          x={props.x}
          y={props.y}
          size={5}
          style={{
            stroke: color ?? "#4c535e",
            fill: "#353234",
          }}
        />
      </g>
    );
  },
  (prevProps, nextProps) => prevProps.x === nextProps.x && prevProps.y === nextProps.y,
);
