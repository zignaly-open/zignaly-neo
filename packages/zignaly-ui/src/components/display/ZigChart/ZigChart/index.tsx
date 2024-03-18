import React, { useCallback, useLayoutEffect, useReducer, useRef } from "react";
import {
  VictoryArea,
  VictoryAxis,
  VictoryLine,
  VictoryChart,
  VictoryLabel,
  VictoryBar,
  VictoryVoronoiContainer,
  CallbackArgs,
} from "victory";
import { useAxisStyle, ChartLayoutLarge } from "../styles";
import { AxisFormat, ChartLargeProps } from "../types";
import { useChartData } from "../hooks";
import { useTheme } from "@mui/material";
import { ChartTooltip } from "./atoms";
import { useChartColor, useTicks } from "./util";

const ZigChart = ({
  id,
  data,
  yAxisFormatter,
  tooltipFormatter,
  events,
  bars,
  tickCount = 7,
  onlyIntegerTicks,
  showCurrentLine = !bars,
  chartProps = {},
  precision = 2,
}: ChartLargeProps) => {
  const theme = useTheme();
  const axisStyle = useAxisStyle();
  const { data: processedData, color, gradient, yDomain } = useChartData(data, "full", precision);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { width, height } = wrapperRef?.current?.getBoundingClientRect() || { width: 0, height: 0 };
  const pureChartWidth = width ? width - 70 - 2 : 0;
  const chartColors = useChartColor();
  const barChartWidth = pureChartWidth / processedData.length;
  const barChartWidthAdjustedForPadding = Math.min(25, pureChartWidth / (processedData.length + 2));

  // dirty fix for rerender
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  useLayoutEffect(() => {
    forceUpdate();
  }, [width]);

  const getChartLabel = useCallback(
    ({ datum = 0 }: { datum?: number }): string =>
      yAxisFormatter ? yAxisFormatter(datum) : datum.toString(),
    [yAxisFormatter],
  );

  const getChartTooltip = useCallback(
    ({ datum }: { datum: AxisFormat }): string =>
      tooltipFormatter ? tooltipFormatter(datum) : `${datum.x}\n${datum.y}`,
    [tooltipFormatter],
  );

  const lastDataY = processedData[processedData.length - 1]?.y;
  const ticks = useTicks(
    processedData,
    yDomain,
    tickCount,
    onlyIntegerTicks,
    showCurrentLine,
    height,
  );

  return (
    <ChartLayoutLarge ref={wrapperRef} id={id}>
      {width && (
        <VictoryChart
          containerComponent={
            <VictoryVoronoiContainer
              voronoiDimension="x"
              labels={getChartTooltip}
              labelComponent={<ChartTooltip color={!bars ? color : undefined} />}
              voronoiBlacklist={["eventLine", "currentLine"]}
            />
          }
          {...{
            domain: { y: yDomain as unknown as undefined },
            width: width || 600,
            height: 300,
            domainPadding: { x: bars ? [barChartWidth / 2, barChartWidth / 2] : 0, y: 1 },
            padding: { left: 35, top: 20, right: 35, bottom: 20 },
          }}
          {...chartProps}
        >
          <VictoryAxis
            tickValues={ticks}
            tickLabelComponent={
              <VictoryLabel
                style={{
                  ...axisStyle.tickLabels,
                  fill: ({ datum }: CallbackArgs) =>
                    showCurrentLine && datum === lastDataY
                      ? `${color}cc`
                      : theme.palette.neutral200,
                }}
                textAnchor="start"
                text={getChartLabel}
              />
            }
            dependentAxis
            orientation="right"
            style={axisStyle}
          />

          {(events || []).map(({ x, label }) => (
            <VictoryLine
              name="eventLine"
              key={"event-line-" + x}
              style={{
                data: { stroke: theme.palette.neutral500, strokeWidth: 0.5 },
              }}
              data={[
                { x, y: yDomain[1] },
                { x, y: yDomain[0] },
              ]}
              labels={[label]}
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

          {showCurrentLine && (
            <VictoryLine
              name="currentLine"
              key={"current-line"}
              style={{
                data: {
                  stroke: `${color}80`,
                  strokeWidth: 1,
                  strokeDasharray: "1.75, 0.25",
                  background: theme.palette.neutral600,
                },
              }}
              data={[
                { x: 0, y: lastDataY },
                {
                  x: processedData.length,
                  y: lastDataY,
                },
              ]}
            />
          )}

          <VictoryAxis tickFormat={() => ""} style={axisStyle} />

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
                    return datum.y > 0 ? chartColors.green : chartColors.red;
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
