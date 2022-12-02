import React, { useMemo, useReducer, useRef } from "react";
import {
  VictoryArea,
  VictoryAxis,
  VictoryChart,
  VictoryGroup,
  VictoryLabel,
  VictoryLine,
} from "victory";
import { ChartLayoutMini } from "../styles";
import { ChartsProps } from "../types";
import { useChartData } from "../hooks";
import GraphColor from "../GraphColors";
import { AxisFormat, largeStyle } from "../../Charts/types";
import { Layout, WideWrapper } from "../../Charts/styles";

const ZigChart = ({ data, midLine, height }: ChartsProps) => {
  const { data: processedData, isGreen } = useChartData(data);
  const strokeColor = isGreen ? "#18ED90" : "#CC3993";

  const wrapperRef = useRef<HTMLDivElement>(null);
  const firstTimestamp = processedData[0].y;
  const lastTimeStamp = processedData[data.length - 1].y;
  const isGreen = firstTimestamp <= lastTimeStamp;
  const strokeColor = isGreen ? "#18ED90" : "#CC3993";
  const gradientId = useMemo(() => `gradient-${Math.random()}`, []);
  const large = variant === "large";
  const ChartWrapperComponent = large ? VictoryChart : VictoryGroup;
  const width = wrapperRef?.current?.getBoundingClientRect().width;

  // dirty fix for rerender
  // but this shit is going to the bin anyways so whatever
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  if (!width) setTimeout(forceUpdate, 50);

  return (
    <WideWrapper wide={large} ref={wrapperRef}>
      <GraphColor isGreen={isGreen} gradientId={gradientId} />
      <Layout variant={variant}>
        {width || !large ? (
          <>
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
              {large && (
                <VictoryAxis
                  tickLabelComponent={<VictoryLabel text={({ datum }) => `${datum}%`} />}
                  dependentAxis
                  style={largeStyle}
                />
              )}
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
              {large && <VictoryAxis fixLabelOverlap style={largeStyle} />}
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
          </>
        ) : null}
      </Layout>
    </WideWrapper>
  );

  const gradientId = useMemo(() => `gradient-${Math.random()}`, []);

  return (
    <ChartLayoutMini height={height}>
      <GraphColor isGreen={isGreen} gradientId={gradientId} />
      <VictoryGroup padding={{ top: 5, bottom: 10 }}>
        <VictoryArea
          style={{
            data: {
              fill: `url(#${gradientId})`,
              strokeWidth: 4,
              stroke: strokeColor,
            },
          }}
          data={processedData}
        />
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
              { x: 0, y: 0 },
              { x: processedData.length, y: 0 },
            ]}
          />
        )}
      </VictoryGroup>
    </ChartLayoutMini>
  );
};

export default ZigChart;
