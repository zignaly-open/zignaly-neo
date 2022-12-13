import React, { useCallback, useLayoutEffect, useMemo, useReducer, useRef } from "react";
import { VictoryArea, VictoryAxis, VictoryChart, VictoryLabel } from "victory";
import { axisStyle, ChartLayoutLarge } from "../styles";
import { ChartLargeProps } from "../types";
import { useChartData } from "../hooks";
import GraphColors from "../GraphColors";
// eslint-disable-next-line import/no-extraneous-dependencies
import * as d3Scale from "victory-vendor/d3-scale";
// eslint-disable-next-line import/no-extraneous-dependencies
import { TextAnchorType } from "victory-core/lib/victory-label/victory-label";

const ZigChart = ({ data, yAxisFormatter, tickCount = 7, onlyIntegerTicks }: ChartLargeProps) => {
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
