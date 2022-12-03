import React, { useLayoutEffect, useReducer, useRef } from "react";
import { VictoryArea, VictoryAxis, VictoryChart, VictoryLabel } from "victory";
import { axisStyle, ChartLayoutLarge } from "../styles";
import { ChartLargeProps } from "../types";
import { useChartData } from "../hooks";
import GraphColors from "../GraphColors";

const ZigChart = ({ data, yAxisFormatter }: ChartLargeProps) => {
  const { data: processedData, color, gradient } = useChartData(data);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const width = wrapperRef?.current?.getBoundingClientRect().width;

  // dirty fix for rerender
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  useLayoutEffect(() => {
    forceUpdate();
  }, [width]);

  return (
    <ChartLayoutLarge ref={wrapperRef}>
      <GraphColors />

      {width && (
        <VictoryChart
          {...{
            width: width || 600,
            height: 400,
            domainPadding: { x: [0, 1], y: 5 },
            padding: { left: 35, top: 20, right: 35, bottom: 20 },
          }}
        >
          <VictoryAxis
            tickLabelComponent={
              <VictoryLabel
                text={({ datum }) => (yAxisFormatter ? yAxisFormatter(datum) : datum)}
              />
            }
            dependentAxis
            style={axisStyle}
          />

          <VictoryAxis tickLabelComponent={<VictoryLabel />} fixLabelOverlap style={axisStyle} />

          <VictoryArea
            style={{
              data: {
                fill: `url(#${gradient})`,
                strokeWidth: 3,
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
