import React, { useCallback, useLayoutEffect, useMemo, useReducer, useRef } from "react";
import {
  VictoryArea,
  VictoryAxis,
  VictoryLine,
  VictoryChart,
  VictoryScatter,
  VictoryLabel,
  VictoryBar,
  VictoryVoronoiContainer,
} from "victory";
import { axisStyle, ChartLayoutLarge } from "../styles";
import { ChartColor, ChartLargeProps } from "../types";
import { useChartData } from "../hooks";
// eslint-disable-next-line import/no-extraneous-dependencies
import * as d3Scale from "victory-vendor/d3-scale";
// eslint-disable-next-line import/no-extraneous-dependencies
import { useTheme } from "@mui/material";
import { ChartTooltip } from "./atoms";

const ZigChart = ({
  data,
  yAxisFormatter,
  tooltipFormatter,
  events,
  bars,
  tickCount = 7,
  onlyIntegerTicks,
  chartProps = {},
}: ChartLargeProps) => {
  const theme = useTheme();
  const { data: processedData, color, gradient } = useChartData(data, "full");
  const wrapperRef = useRef<HTMLDivElement>(null);
  const width = wrapperRef?.current?.getBoundingClientRect().width;
  const pureChartWidth = width ? width - 70 - 2 : 0;
  const barChartWidthAdjustedForPadding = Math.min(25, pureChartWidth / (processedData.length + 2));

  // dirty fix for rerender
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  useLayoutEffect(() => {
    forceUpdate();
  }, [width]);

  const yDomain = useMemo(() => {
    const values = processedData.map((s) => s.y);
    return [Math.min(0, ...values), Math.max(1, ...values)];
  }, [processedData]);

  const getChartLabel = useCallback(
    ({ datum = 0 }: { datum?: number }): string =>
      yAxisFormatter ? yAxisFormatter(datum) : datum.toString(),
    [yAxisFormatter],
  );

  const ticks = d3Scale
    .scaleLinear()
    .domain(yDomain)
    .ticks(tickCount)
    .filter((v) => !onlyIntegerTicks || Number.isInteger(v));

  return (
    <ChartLayoutLarge ref={wrapperRef}>
      {width && (
        <VictoryChart
          containerComponent={
            <VictoryVoronoiContainer
              voronoiDimension="x"
              labels={(point) => tooltipFormatter?.(point.datum) ?? " "}
              labelComponent={<ChartTooltip color={!bars ? color : undefined} />}
              voronoiBlacklist={["eventLine", "scatterText"]}
            />
          }
          {...{
            domain: { y: yDomain as unknown as undefined },
            width: width || 600,
            height: 300,
            domainPadding: { x: 0, y: 1 },
            padding: { left: 35, top: 20, right: 35, bottom: 20 },
          }}
          {...chartProps}
        >
          <VictoryAxis
            tickValues={ticks}
            tickLabelComponent={<VictoryLabel textAnchor="end" text={getChartLabel} />}
            dependentAxis
            style={axisStyle}
            fixLabelOverlap
          />

          {(events || []).map(({ x, label }) => (
            <VictoryScatter
              key={"event-text-" + x}
              width={0}
              data={[{ x, y: yDomain[1] }]}
              labels={[label]}
              size={0}
              name="scatterText"
              labelComponent={
                <VictoryLabel
                  dy={17}
                  labelPlacement="vertical"
                  style={[{ fontSize: 14, fill: theme.palette.neutral500 }]}
                  angle={-90}
                  textAnchor="end"
                />
              }
            />
          ))}

          {(events || []).map(({ x }) => (
            <VictoryLine
              name="eventLine"
              key={"event-line-" + x}
              style={{
                data: { stroke: theme.palette.neutral500, strokeWidth: 0.5 },
              }}
              data={[
                { x, y: yDomain[0] },
                { x, y: yDomain[1] },
              ]}
            />
          ))}

          <VictoryAxis
            tickFormat={() => ""}
            tickLabelComponent={<VictoryLabel />}
            style={axisStyle}
          />

          <VictoryAxis
            offsetY={20}
            tickLabelComponent={<VictoryLabel backgroundPadding={{ top: 5 }} />}
            fixLabelOverlap
            style={
              bars
                ? {
                    ...axisStyle,
                    grid: { stroke: theme.palette.neutral700, strokeDasharray: "3 3" },
                    ticks: { stroke: theme.palette.neutral700, size: 5 },
                  }
                : axisStyle
            }
          />

          {bars ? (
            <VictoryBar
              barRatio={0.9}
              animate={{
                duration: 2000,
                onLoad: { duration: 1000 },
              }}
              barWidth={barChartWidthAdjustedForPadding}
              style={{
                data: {
                  fill: ({ datum }) => {
                    return datum.y > 0 ? ChartColor.Green : ChartColor.Red;
                  },
                  maxWidth: 20,
                  strokeWidth: 0,
                },
              }}
              data={processedData.map((v) => ({ ...v, y0: 0 }))}
            />
          ) : (
            <VictoryArea
              style={{
                data: {
                  fill: `url(#${gradient})`,
                  strokeWidth: 2,
                  stroke: color,
                },
              }}
              data={processedData}
              interpolation="monotoneX"
            />
          )}
        </VictoryChart>
      )}
    </ChartLayoutLarge>
  );
};

export default ZigChart;
