import React from "react";
import { VictoryArea, VictoryGroup, VictoryLine } from "victory";
import { ChartLayoutMini } from "../styles";
import { ChartMiniProps } from "../types";
import { useChartData } from "../hooks";
import GraphColors from "../GraphColors";

const ZigChartMini = ({ data, midLine, height }: ChartMiniProps) => {
  const { data: processedData, color, gradient } = useChartData(data);

  return (
    <ChartLayoutMini height={height}>
      <GraphColors />
      <VictoryGroup padding={{ top: 5, bottom: 10 }}>
        <VictoryArea
          style={{
            data: {
              fill: `url(#${gradient})`,
              strokeWidth: 4,
              stroke: color,
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

export default ZigChartMini;
