import React from "react";
import { VictoryArea, VictoryAxis, VictoryChart, VictoryLine } from "victory";
import { ChartLayoutMini } from "../styles";
import { ChartMiniProps } from "../types";
import { useChartData } from "../hooks";

const ZigChartMini = ({
  data,
  midLine,
  height,
  width,
  gradientVariant = "mini",
  chartProps = {},
}: ChartMiniProps) => {
  const { data: processedData, color, gradient } = useChartData(data, gradientVariant);

  return (
    <ChartLayoutMini height={height}>
      <VictoryChart
        height={height}
        width={width}
        // Avoid cutting the line when it's at the edge of the chart
        singleQuadrantDomainPadding={false}
        domainPadding={{ x: 0, y: 1 }}
        padding={{ top: 5, bottom: 10, left: 0, right: 0 }}
        {...chartProps}
      >
        <VictoryAxis
          style={{
            axis: { stroke: "transparent" },
            ticks: { stroke: "transparent" },
            tickLabels: { fill: "transparent" },
          }}
        />
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
      </VictoryChart>
    </ChartLayoutMini>
  );
};

export default ZigChartMini;
