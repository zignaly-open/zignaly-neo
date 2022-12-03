import React, { useLayoutEffect, useReducer, useRef } from "react";
import { VictoryArea, VictoryAxis, VictoryChart, VictoryLabel } from "victory";
import { ChartLayoutLarge } from "../styles";
import { ChartMiniProps } from "../types";
import { useChartData } from "../hooks";
import GraphColors from "../GraphColors";
import { largeStyle } from "../../Charts/types";

const ZigChart = ({ data }: ChartMiniProps) => {
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
            tickLabelComponent={<VictoryLabel text={({ datum }) => `${datum}%`} />}
            dependentAxis
            style={largeStyle}
          />

          <VictoryAxis fixLabelOverlap style={largeStyle} />

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
