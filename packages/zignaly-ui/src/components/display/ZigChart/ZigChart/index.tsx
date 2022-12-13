import React, { useCallback, useLayoutEffect, useMemo, useReducer, useRef } from "react";
import {
  VictoryArea,
  VictoryAxis,
  VictoryLine,
  VictoryChart,
  VictoryScatter,
  VictoryLabel,
} from "victory";
import { axisStyle, ChartLayoutLarge } from "../styles";
import { ChartLargeProps } from "../types";
import { useChartData } from "../hooks";
import GraphColors from "../GraphColors";
// eslint-disable-next-line import/no-extraneous-dependencies
import * as d3Scale from "victory-vendor/d3-scale";
// eslint-disable-next-line import/no-extraneous-dependencies
import { TextAnchorType } from "victory-core/lib/victory-label/victory-label";
import { useTheme } from "styled-components";
import Theme from "../../../../theme/theme";

const ZigChart = ({
  data,
  yAxisFormatter,
  events,
  tickCount = 7,
  onlyIntegerTicks,
}: ChartLargeProps) => {
  const theme = useTheme() as Theme;
  const { data: processedData, color, gradient } = useChartData(data);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const width = wrapperRef?.current?.getBoundingClientRect().width;

  // dirty fix for rerender
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  useLayoutEffect(() => {
    forceUpdate();
  }, [width]);

  const yDomain = useMemo(() => {
    const values = processedData.map((s) => s.y);
    return [Math.min(0, ...values), Math.max(1, ...values)];
  }, [processedData]);

  const show2ndAxis = yDomain[0] < 0 && (0 - yDomain[0]) / (yDomain[1] - yDomain[0]) > 0.2;
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
      <GraphColors />

      {width && (
        <VictoryChart
          {...{
            domain: { y: yDomain as unknown as undefined },
            width: width || 600,
            height: 300,
            domainPadding: { x: [0, 1], y: 5 },
            padding: { left: 35, top: 20, right: 35, bottom: 20 },
          }}
        >
          <VictoryAxis
            tickValues={ticks}
            tickLabelComponent={
              <VictoryLabel
                text={getChartLabel}
                textAnchor={
                  ((v: { datum?: number }) =>
                    getChartLabel(v).length < 4
                      ? "end"
                      : "start") as unknown as () => TextAnchorType
                }
                dx={(v) => (getChartLabel(v).length < 4 ? 0 : -22)}
              />
            }
            dependentAxis
            style={axisStyle}
          />

          {(events || []).map(({ x, label }) => (
            <VictoryScatter
              key={"event-text-" + x}
              width={0}
              data={[{ x, y: yDomain[1] }]}
              labels={[label]}
              size={0}
              labelComponent={
                <VictoryLabel
                  dy={17}
                  labelPlacement="vertical"
                  style={[{ fontSize: 14, fill: theme.neutral500 }]}
                  angle={-90}
                  textAnchor="end"
                />
              }
            />
          ))}

          {(events || []).map(({ x }) => (
            <VictoryLine
              key={"event-line-" + x}
              style={{
                data: { stroke: theme.neutral500, strokeWidth: 0.5 },
              }}
              data={[
                { x, y: yDomain[0] },
                { x, y: yDomain[1] },
              ]}
            />
          ))}

          {show2ndAxis && (
            <VictoryAxis
              tickFormat={() => ""}
              tickLabelComponent={<VictoryLabel />}
              style={axisStyle}
            />
          )}

          <VictoryAxis
            offsetY={show2ndAxis ? 20 : undefined}
            tickLabelComponent={<VictoryLabel />}
            fixLabelOverlap
            style={axisStyle}
          />

          <VictoryArea
            style={{
              data: {
                fill: `url(#${gradient})`,
                strokeWidth: 1,
                stroke: color,
              },
            }}
            data={processedData}
          />
        </VictoryChart>
      )}
    </ChartLayoutLarge>
  );
};

export default ZigChart;
