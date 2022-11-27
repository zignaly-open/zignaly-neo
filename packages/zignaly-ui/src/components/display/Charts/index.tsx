/* eslint-disable multiline-ternary */
import React, { useMemo, useRef } from "react";
import { VictoryArea, VictoryAxis, VictoryChart, VictoryGroup, VictoryLine } from "victory";
import { Layout } from "./styles";
import { AxisFormat, ChartsProps, largeStyle } from "./types";
import Loader from "../Loader";

export const AreaChart = ({ data, variant, midLine }: ChartsProps) => {
  const processedData = useMemo<AxisFormat[]>(() => {
    const chart =
      typeof data?.[0] === "number"
        ? data.map((value, index) => ({
            x: index,
            y: value as number,
          }))
        : (data as AxisFormat[]);
    const min = chart.reduce((min, v) => Math.min(min, v.y), Number.MAX_VALUE);
    return chart.map((c) => ({ ...c, y0: min }));
  }, [data]);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const firstTimestamp = processedData[0].y;
  const lastTimeStamp = processedData[data.length - 1].y;
  const isGreen = firstTimestamp <= lastTimeStamp;
  const strokeColor = isGreen ? "#18ED90" : "#CC3993";
  const gradientId = useMemo(() => `gradient-${Math.random()}`, []);
  const large = variant === "large";
  const ChartWrapperComponent = large ? VictoryChart : VictoryGroup;
  const width = wrapperRef?.current?.getBoundingClientRect().width;

  return (
    <div ref={wrapperRef}>
      <GraphColor isGreen={isGreen} gradientId={gradientId} />
      <Layout variant={variant}>
        <ChartWrapperComponent
          {...(large
            ? {
                width: width || 600,
                height: 400,
                domainPadding: { x: [0, 1], y: 5 },
                padding: { left: 35, top: 20, right: 35, bottom: 20 },
              }
            : {
                padding: { top: 5, bottom: 10 },
              })}
        >
          {large && <VictoryAxis dependentAxis style={largeStyle} />}
          <VictoryArea
            style={{
              data: {
                fill: `url(#${gradientId})`,
                strokeWidth: large ? 3 : 4,
                stroke: strokeColor,
              },
            }}
            data={processedData}
          />
          {large && <VictoryAxis style={largeStyle} />}
          {midLine && (
            <VictoryLine
              style={{
                data: {
                  stroke: "grey",
                  strokeDasharray: 6,
                  strokeWidth: 2,
                  strokeOpacity: 0.7,
                },
              }}
              data={[
                { x: processedData[0].x, y: 0 },
                { x: processedData[processedData.length - 1].x, y: 0 },
              ]}
            />
          )}
        </ChartWrapperComponent>
      </Layout>
    </div>
  );
};

const GraphColor = ({ isGreen, gradientId }: { isGreen: boolean; gradientId: string }) => {
  return (
    <svg style={{ width: 0, height: 0, display: "block" }}>
      <defs>
        <linearGradient id={gradientId} x1="1%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor={isGreen ? "rgba(17, 27, 47, 0)" : "rgba(18, 20, 39, 0)"} />
          <stop
            offset="50%"
            stopColor={isGreen ? "rgba(22, 41, 67, 0.5)" : "rgba(21, 21, 57, 0.5)"}
          />
          <stop
            offset="100%"
            stopColor={isGreen ? "rgba(39, 110, 107, 1)" : "rgba(86, 36, 108, 1)"}
          />
        </linearGradient>
      </defs>
    </svg>
  );
};
